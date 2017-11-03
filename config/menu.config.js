const menuData = [{
    menuId: "10001",
    menuName: "管理面板",
    menuIcon: "fa-tachometer",
    menuUrl: "#",
    pageName:"page1",
    status: 1
}, {
    menuId: "10003",
    menuName: "数据统计",
    menuIcon: "fa-area-chart",
    menuUrl: "http://www.bootcdn.cn/",
    pageName:"page2",
    status: 0,
    subMenus: [{
        menuId: "10011",
        menuName: "流量统计",
        menuIcon: "fa-puzzle-piece",
        menuUrl: "#",
        pageName:"page21",
        status: 0
    }, {
        menuId: "10012",
        menuName: "访问统计",
        menuIcon: "fa-puzzle-piece",
        menuUrl: "#",
        pageName:"page22",
        status: 0
    }]
}, {
    menuId: "10006",
    menuName: "项目管理",
    menuIcon: "fa-puzzle-piece",
    menuUrl: "#",
    pageName:"project",
    status: 0,
    subMenus: [{
            menuId: "10011",
            menuName: "项目列表",
            menuIcon: "fa-list-ul",
            menuUrl: "/admin/project/list",
            pageName:"project-list",
            status: 0
        }, {
            menuId: "10012",
            menuName: "新增项目",
            menuIcon: "fa-plus",
            menuUrl: "/admin/project/add",
            pageName:"project-add",
            status: 0
        }
    ]
}, {
    menuId: "10004",
    menuName: "接口管理",
    menuIcon: "fa-puzzle-piece",
    menuUrl: "#",
    pageName:"interface",
    status: 0,
    subMenus: [{
            menuId: "10011",
            menuName: "接口列表",
            menuIcon: "fa-list-ul",
            menuUrl: "/admin/interface/list",
            pageName:"interface-list",
            status: 0
        }, {
            menuId: "10012",
            menuName: "新增接口",
            menuIcon: "fa-plus",
            menuUrl: "/admin/interface/add",
            pageName:"interface-add",
            status: 0
        },
        {
            menuId: "10012",
            menuName: "接口测试",
            menuIcon: "fa-flask",
            menuUrl: "#",
            pageName:"interface-test",
            status: 0
        }
    ]
}, {
    menuId: "10005",
    menuName: "系统设置",
    menuIcon: "fa-cog",
    menuUrl: "#",
    pageName:"page4",
    status: 0
}, {
    menuId: "10006",
    menuName: "安全退出",
    menuIcon: "fa-sign-out",
    menuUrl: "#",
    pageName:"page5",
    status: 0
}];

module.exports={
    menuData
}