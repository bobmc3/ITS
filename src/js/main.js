let rowCount = 0

function CreateTd(elTag, elType, elValue, elId, elClassName) {
  
  const td = document.createElement('TD');
  const txt  = document.createElement(elTag);
  txt.type = elType
  txt.id = elId
  txt.value = elValue
  txt.className = elClassName

  if (elTag == 'TEXTAREA') {
    txt.rows = 1
  }
  

  if(elClassName.substring(0,6) !== 'tdEdit'){
    txt.readOnly = true
  } 

  td.appendChild(txt)
  return td
}

function AddNewRow () { 
  
  const tbl = document.getElementById('tblteste')
  const tableRowCount = tbl.children.length
  
  if (tableRowCount == rowCount) {

    const objEmpty = {
        trf_dat:'',
        trf_proj:'',
        trf_cli:'',
        trf_taref:'',
        trf_temp:'',
        trf_inf:''
      }
    AddRow(objEmpty, rowCount+1, true)
  } else {
    alert('Precisa gravar antes de adicionar uma nova linha.')
  }

}

function AddRow(objTarefa, count, isNew) {
  
  //  const tbl = document.querySelector('#tblTimesheet tbody')
  const tbl = document.getElementById('tblteste')
  
  const newTr = document.createElement('TR');

  if(!isNew){ 

    newTr.id = 'row_' + objTarefa.trf_id
  }

  const rowId =  objTarefa.trf_id
  
  const tdOrd = document.createElement('TD');
  tdOrd.innerText = count
  tdOrd.className = 'tdCenter'
  newTr.appendChild(tdOrd)
  

  let classNamePrefix = 'td'
  if(isNew){
    classNamePrefix = 'tdEdit'
  }

  const tdDat = CreateTd('INPUT', 'date', objTarefa.trf_dat, 'txtDat' + rowId, classNamePrefix + 'Data')
  tdDat.className = 'tdDataCell'
  newTr.appendChild(tdDat)

  const tdProj = CreateTd('INPUT', 'text', objTarefa.trf_proj, 'txtProj' + rowId,  classNamePrefix + 'Txt')
  newTr.appendChild(tdProj)

  const tdCli = CreateTd('INPUT', 'text', objTarefa.trf_cli, 'txtCli' + rowId,  classNamePrefix + 'Txt')
  newTr.appendChild(tdCli)

  const tdTaref = CreateTd('INPUT', 'text', objTarefa.trf_taref, 'txtTaref' + rowId, classNamePrefix + 'Txt')
  newTr.appendChild(tdTaref)

  const tdTemp = CreateTd('INPUT', 'time', objTarefa.trf_temp, 'txtTemp' + rowId,  classNamePrefix + 'Tempo')
  tdTemp.className = 'tdCenter'
  newTr.appendChild(tdTemp)

  const tdInf = CreateTd('TEXTAREA', 'text', objTarefa.trf_inf, 'txtInf' + rowId,  classNamePrefix + 'TxtArea')
  newTr.appendChild(tdInf)

  const btnSave = document.createElement('INPUT')
  btnSave.type = 'button'
  btnSave.new = isNew
  btnSave.value = 'Save'
  btnSave.className = 'btn btn-outline-success'
  btnSave.addEventListener('click', function(){ UpdateRow(this) })

  const btnEdit = document.createElement('INPUT')
  btnEdit.type = 'button'
  btnEdit.value = 'Edit'
  btnEdit.className = 'btn btn-outline-secondary'
  btnEdit.addEventListener('click', function(){ EditRow(rowId) })
  
  if (isNew){ 
    btnSave.style.display = ''
    btnEdit.style.display = 'none'
   
  } else {
    btnSave.id ='btnSave_' + rowId
    btnEdit.id ='btnEdit_' + rowId
    btnSave.style.display = 'none'
    btnEdit.style.display = ''
  }
 
  const tdOption = document.createElement('TD')
  tdOption.appendChild(btnSave)
  tdOption.appendChild(btnEdit)
  newTr.appendChild(tdOption)

  const btnDel = document.createElement('INPUT')
  btnDel.type = 'button'
  btnDel.className = 'btn btn-outline-danger'
  btnDel.value = 'Del.'

  btnDel.addEventListener('click', function(){ DeleteRow(rowId) })
  const tdDel = document.createElement('TD')
  tdDel.appendChild(btnDel)
  newTr.appendChild(tdDel)

  // for ( let i = 1; i < Object.keys(objTarefa).length; i++)
  // {
    // const td = document.createElement('TD');
    // td.innerText = Object.keys(objTarefa)[i]
    // newTr.appendChild(td)
  // }
  
  tbl.appendChild(newTr)

    // if (i == 0 || i == 2 || i == 3) {
    //   td.innerText = objTarefa[i];
    // }
    // else {
    //   const txt = document.createElement('INPUT');
    //   txt.type = "text";
    //   txt.value = objTarefa[i];
    //   txt.style.width = "50px";

    //   td.appendChild(txt);
    // }

  // mensagem()

}

function mensagem() {
  $(document).ready(function () {
    $("input").click(function () {
      alert("Clicked.");
    });
  });
};

function PreencheTabela(arrTarefas) {
  rowCount = arrTarefas.length
  document.getElementById('tblteste').innerHTML = ''
  
  for (let x = 0; x < arrTarefas.length; x++) {

    AddRow(arrTarefas[x], x+1, false)

  } 
}

function SaveRow(tr, isNew) {

  const txtDat = tr.children[1].children[0]
  const txtProj =  tr.children[2].children[0]
  const txtCli =  tr.children[3].children[0]
  const txtTaref =  tr.children[4].children[0]
  const txtTemp =  tr.children[5].children[0]
  const txtInf =  tr.children[6].children[0]

  let isValid = true

  for (i = 1; i < 6; i++) {
   let txt = tr.children[i].children[0]
   txt.style.outline = 'none'

    if (txt.value == '') {
      txt.style.outline = 'solid 1px orangered'
      isValid = false
    }
  }

  const objRow = {
    trf_dat: txtDat.value,
    trf_proj: txtProj.value,
    trf_cli: txtCli.value,
    trf_taref: txtTaref.value,
    trf_temp: txtTemp.value,
    trf_inf: txtInf.value,
    trf_id: tr.id.replace('row_', '' )

  }
  
    if (isValid) {
      
      if (isNew) {
        AjaxInsertTarefa(objRow)
  
      } else {
        AjaxUpdateTarefa(objRow)
      }
    }
    else {
      alert('Preencha os campos obrigatórios!')
    }
}

function UpdateRow(btn){
  
    const tr = btn.parentNode.parentNode
    SaveRow(tr, btn.new)
}

function EditRow(rowId) {

  const rowChildren = document.getElementById('row_' + rowId).children;
  
    for(i=1; i < rowChildren.length-2; i++){

    
      const txt = rowChildren[i].children[0]

    txt.className = txt.className.replace("td", "tdEdit")
    txt.readOnly = false
  }

rowChildren[7].children[0].style.display = ''
rowChildren[7].children[1].style.display = 'none'

rowChildren[1].children[0].type = 'date'
rowChildren[5].children[0].type = 'time'

rowChildren[7].children[0].insert = false

}

function DeleteRow(rowId) {

  if(confirm('Quer mesmo apagar?')) {
    AjaxDeleteTarefa(rowId)
  }

}

function AjaxSaveResult() {
  AjaxGetTarefas()
  rowCount++
}
//--------------------------- Login --------------------------
function Login() {
  const user = 'user'
  const pass = 'pass'
  const userName = document.getElementById('txtUserName').value

  const password = document.getElementById('txtPassword').value

  if(userName == user && password == pass) {
    window.location.href='index.html'
  } else {
    if(userName!==user){

      alert('User incorreto')
    } 
    else if (password !== pass) {
      
      alert('Password incorreta')
    }
  }
}