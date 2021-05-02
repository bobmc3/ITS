function AjaxGetTarefas() {

    $.ajax({
        type: "GET"
        , url: "../src/php/get_tarefa.php"
        , success: function (result) {

            arrTarefas = JSON.parse(result)

            PreencheTabela(arrTarefas);

        }
        , error: function () {
            alert('erro');
        }
    });
    
}

 function AjaxInsertTarefa(objRow) {   

    $.ajax({
        url: "../src/php/save_tarefa.php"
      , method: 'POST'
      , data: { tarefa: objRow }
      , success: function (result, status, xhr) {
        if (xhr.status == 200) {
          AjaxSaveResult()
            alert('Gravado com sucesso');
        } else  {
            alert('erro1');
        } 
      }
      , error: function () {
        alert('erro2');
      }
  });
 } 

 function AjaxUpdateTarefa(objRow) {   

  $.ajax({
      url: "../src/php/update_tarefa.php"
    , method: 'POST'
    , data: { tarefa: objRow }
    , success: function (result, status, xhr) {
      if (xhr.status == 200) {
        AjaxSaveResult()
          alert('Gravado com sucesso');
      } else  {
          alert('erro1');
      } 
    }
    , error: function () {
      alert('erro2');
    }
});
} 

 function AjaxDeleteTarefa(rowId) {   

    $.ajax({
        url: "../src/php/del_tarefa.php?id="+rowId
      , method: 'DELETE'
      // , data: { id : rowId }
      , success: function (result, status, xhr) {
        if (xhr.status == 200) {
      
          AjaxGetTarefas()
          
        } else {
          alert('erro1');
        }
      }
      , error: function () {
        alert('erro2');
      }
  });
 } 