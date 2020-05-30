var baseUrl = "http://192.168.1.105:8080/admin/";
var apiConfig = {
    Login: baseUrl + "login",
    Menus: baseUrl + "menus",
    Authoritys: baseUrl + "user/authoritys",
    Addauthoritys: baseUrl + "group/create_or_update", //添加权限
    getAuthority: baseUrl + "group/list",
    getGroupAuthority: baseUrl + "group/authoritys",
    addManager: baseUrl + "user/create_or_update", //添加管理员,
    getAuthorityIds: baseUrl + "group/trees", //获取权限组Ids
    getManagerList: baseUrl + "user/list"
}
export default apiConfig;