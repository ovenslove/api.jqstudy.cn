;
$(function () {
    // 初始化数据
    var json = $("#responseJsonEditor").data('value');
    // 实例化responseJsonEditor编辑器
    var responseJsonEditorDom = document.getElementById("responseJsonEditor");
    var options = {
        modes: [ 'view','code']
    };
    var responseJsonEditor = new JSONEditor(responseJsonEditorDom, options);
    responseJsonEditor.set(json);


});