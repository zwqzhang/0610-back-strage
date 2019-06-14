
// 一段时间未操作或者突然断网等其他原因，再次操作时需要重新登录
function login(obj,d) {
    obj.$message({
        message: d.data.info,
        type: "warning"
    });
    obj.$router.replace('/login');
    return;
}
export default{
    login,
}