export default{
    tel(obj,str){
        var re=/^1[3456789]\d{9}$/;
        if(re.test(str)){
         console.log('通过');
        }else{
            obj.$message({
                message: "请输入正确的电话号码",
                type: "warning"
                });
        }
    },
    id(obj,str){
        var re=/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if(re.test(str)){
            console.log('通过');
           }else{
               obj.$message({
                   message: "请输入正确的身份证号",
                   type: "warning"
                   });
           }
    },
    email(obj,str){
        var re=/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
        if(re.test(str)){
            console.log('通过');
           }else{
               obj.$message({
                   message: "请输入正确的邮箱",
                   type: "warning"
                   });
           }
    },
    all(obj,str1,str2,str3){
        var re1=/^1[3456789]\d{9}$/;
        var re2=/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        var re3=/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
        if (re1.test(str1)&&re2.test(str2)&&re3.test(str3)) {
            console.log('通过');
        }else{
            obj.$message({
                message: "请按格式正确输入",
                type: "warning"
                });
        }
    }
}