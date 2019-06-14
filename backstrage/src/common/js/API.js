var baseUrl = "/api"
// var baseUrl=''
// 登录
var login = baseUrl + '/login';
// 管理员增删改查
var findManage = baseUrl + '/findManage';
var updateManage = baseUrl + '/updateManage';
var addManage = baseUrl + '/addManage';
var delManage = baseUrl + '/delManage'
// 用户增删改查
var addUser = baseUrl + '/addUser'
var delUser = baseUrl + '/delUser'
var findUser = baseUrl + '/findUser'
var updateUser = baseUrl + '/updateUser'
// 通知增删改查
var addNews = baseUrl + '/addNews'
var findNews = baseUrl + "/findNews"
var updateNews = baseUrl + '/updateNews'
var delNews = baseUrl + '/delNews'
// 设备增删改查
var addDevice = baseUrl + "/addDevice"
var delDevice = baseUrl + "/delDevice"
var updateDevice = baseUrl + "/updateDevice"
var findDevice = baseUrl + "/findDevice"
// 退出
var quit = baseUrl + "/exit"
export default {
    login,
    findManage,
    updateManage,
    addManage,
    delManage,
    addUser,
    delUser,
    findUser,
    updateUser,
    addNews,
    findNews,
    updateNews,
    delNews,
    addDevice,
    delDevice,
    updateDevice,
    findDevice,
    quit
}