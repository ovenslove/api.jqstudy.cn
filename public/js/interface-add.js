;
$(function () {
    // 初始化数据
    var json = {
        "Array": [1, 2, 3],
        "Boolean": true,
        "Null": null,
        "Number": 123,
        "Object": {
            "a": "b",
            "c": "d"
        },
        "String": "Hello World"
    };
    // 实例化responseJsonEditor编辑器
    var responseJsonEditorDom = document.getElementById("responseJsonEditor");
    var options = {
        modes: ['code', 'view', 'form']
    };
    var responseJsonEditor = new JSONEditor(responseJsonEditorDom, options);
    responseJsonEditor.set(json);


    // parameterDeleteBtn参数节点删除事件
    $(".requestParameterContainer .panleBody table tbody").on('click', 'button.parameterDeleteBtn', function () {
        $(this).parent().parent().remove();
    })
    // parameterDeleteBtn参数节点删除事件
    $(".responseParameterContainer .panleBody table tbody").on('click', 'button.parameterDeleteBtn', function () {
        $(this).parent().parent().remove();
    })
    // 请求参数新增参数按钮
    $(".requestParameterAddBtn").on('click', function () {
        let tpls = `
            <tr class="simRequestParameter">
                <td>
                    <input class="parameterName" type="text" placeholder="参数名">
                </td>
                <td> 
                    <select class="parameterType" name="">
                        <option value="String">String</option>
                        <option value="Bollean">Bollean</option>
                        <option value="Number">Number</option>
                        <option value="Object">Object</option>
                    </select>
                </td>
                <td> 
                    <select class="parameterRequired" name="">
                        <option value="true">是</option>
                        <option value="false">否</option>
                        </select>
                </td>
                <td> 
                    <input class="parameterDefault" type="text" placeholder="默认值">
                </td>
                <td> 
                    <input class="parameterRemarks" type="text" placeholder="备注">
                </td>
                <td> 
                    <button class="ui button parameterDeleteBtn"> 删除</button>
                </td>
            </tr>
        `;

        $(".requestParameterContainer .panleBody table tbody").append(tpls);
    });

    // 返回参数新增参数按钮
    $(".responseParameterAddBtn").on('click', function () {
        let tpls = `
            <tr class="simResponseParameter">
                <td>
                    <input class="parameterName" type="text" placeholder="参数名">
                </td>
                <td> 
                    <select class="parameterType" name="">
                        <option value="String">String</option>
                        <option value="Bollean">Bollean</option>
                        <option value="Number">Number</option>
                        <option value="Object">Object</option>
                    </select>
                </td>
                <td> 
                    <input class="parameterRemarks" type="text" placeholder="备注">
                </td>
                <td> 
                    <button class="ui button parameterDeleteBtn"> 删除</button>
                </td>
            </tr>
            `;

        $(".responseParameterContainer .panleBody table tbody").append(tpls);
    });

    // 确认按钮
    $(".submitBtn").on('click',function(){
        let interfaceData={};
        interfaceData.name=$('.interfaceName').val();
        interfaceData.url=$('.interfaceUrl').val();
        interfaceData.type=$('.interfaceType').val();
        interfaceData.requestParameter=[];
        interfaceData.responseParameter=[];
        interfaceData.responseJsonData=responseJsonEditor.get();

        $(".simRequestParameter").each(function(key,val){
            let parameterData={};
            parameterData.name=$(this).find('input.parameterName').val();
            parameterData.type=$(this).find('select.parameterType').val();
            parameterData.required=$(this).find('select.parameterRequired').val();
            parameterData.default=$(this).find('input.parameterDefault').val();
            parameterData.remarks=$(this).find('input.parameterRemarks').val();
            interfaceData.requestParameter.push(parameterData);
        })

        $(".simResponseParameter").each(function(key,val){
            let parameterData={};
            parameterData.name=$(this).find('input.parameterName').val();
            parameterData.type=$(this).find('select.parameterType').val();
            parameterData.remarks=$(this).find('input.parameterRemarks').val();
            interfaceData.responseParameter.push(parameterData);
        })
        // 获取到表单数据后请求数据

        axios
        .post('http://localhost:3000/admin/interface/add',interfaceData)
        .then(res=>{
            if(res.data.status===1){
                console.log('添加成功')
                alert('添加成功');
                window.history.go(0);
            }else{
                console.log('添加失败');
            }
        }).catch(err=>{

        });
    })
});