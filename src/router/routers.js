import Main from '@/components/main'
import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true,
      icon: 'logo-buffer',
      title: '首页'
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },
  {
    path: '/home',
    name: 'home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: false,
      notCache: true,
      icon: 'ios-home-outline',
      title: '首页'
    }
  },
  {
    path: '',
    name: 'doc',
    meta: {
      title: '文档',
      href: 'https://lison16.github.io/iview-admin-doc/#/',
      access: [ 'manage' , 'super_admin' ],
      icon: 'ios-book'
    }
  },
  // {
  //   path: '/join',
  //   name: 'join',
  //   component: Main,
  //   meta: {
  //     hideInBread: true
  //   },
  //   children: [
  //     {
  //       path: 'join_page',
  //       name: 'join_page',
  //       meta: {
  //         icon: '_qq',
  //         title: 'QQ群'
  //       },
  //       component: () => import('@/view/join-page.vue')
  //     }
  //   ]
  // },

  {
    path: '/message',
    name: 'message',
    component: Main,
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    children: [
      {
        path: 'message_page',
        name: 'message_page',
        meta: {
          icon: 'md-notifications',
          title: '消息中心'
        },
        component: () => import('@/view/single-page/message/index.vue')
      }
    ]
  },
  {
    path: '/components',
    name: 'components',
    meta: {
      icon: 'logo-buffer',
      title: '组件'
    },
    component: Main,
    children: [
      {
        path: 'count_to_page',
        name: 'count_to_page',
        meta: {
          icon: 'md-trending-up',
          title: '数字渐变'
        },
        component: () => import('@/view/components/count-to/count-to.vue')
      },
      {
        path: 'drag_list_page',
        name: 'drag_list_page',
        meta: {
          icon: 'ios-infinite',
          title: '拖拽列表'
        },
        component: () => import('@/view/components/drag-list/drag-list.vue')
      },
      {
        path: 'tree_table_page',
        name: 'tree_table_page',
        meta: {
          icon: 'md-git-branch',
          title: '树状表格'
        },
        component: () => import('@/view/components/tree-table/index.vue')
      },
      {
        path: 'cropper_page',
        name: 'cropper_page',
        meta: {
          icon: 'md-crop',
          title: '图片裁剪'
        },
        component: () => import('@/view/components/cropper/cropper.vue')
      },
      {
        path: 'tables_page',
        name: 'tables_page',
        meta: {
          icon: 'md-grid',
          title: '多功能表格'
        },
        component: () => import('@/view/components/tables/tables.vue')
      },
      {
        path: 'split_pane_page',
        name: 'split_pane_page',
        meta: {
          icon: 'md-pause',
          title: '分割窗口'
        },
        component: () => import('@/view/components/split-pane/split-pane.vue')
      },
      {
        path: 'markdown_page',
        name: 'markdown_page',
        meta: {
          icon: 'logo-markdown',
          title: 'Markdown编辑器'
        },
        component: () => import('@/view/components/markdown/markdown.vue')
      },
      {
        path: 'editor_page',
        name: 'editor_page',
        meta: {
          icon: 'ios-create',
          title: '富文本编辑器'
        },
        component: () => import('@/view/components/editor/editor.vue')
      },
      {
        path: 'icons_page',
        name: 'icons_page',
        meta: {
          icon: '_bear',
          title: '自定义图标'
        },
        component: () => import('@/view/components/icons/icons.vue')
      }
    ]
  },
  {
    path: '/test',
    name: '测试',
    component: Main,
    meta: {
      icon: 'md-paper',
      title: '测试'
    },
    children: [
      {
        path: 'table01',
        name: '表格1',
        meta: {
          icon: 'ios-list-box',
          title: 'table1'
        },
        component: () => import('@/view/table/table01.vue')
      },
      {
        path: 'table02',
        name: '表格2',
        meta: {
          icon: 'ios-list-box',
          title: 'table2'
        },
        component: () => import('@/view/table/table02.vue')
      },
      {
        path: 'table03',
        name: '表格3',
        meta: {
          icon: 'ios-list-box',
          title: 'table3'
        },
        component: () => import('@/view/table/table03.vue')
      },
      {
        path: 'table04',
        name: '表格4',
        meta: {
          icon: 'ios-list-box',
          title: 'table4'
        },
        component: () => import('@/view/table/table04.vue')
      },
      {
        path: 'table05',
        name: '表格5',
        meta: {
          icon: 'ios-list-box',
          title: 'table5'
        },
        component: () => import('@/view/table/table05.vue')
      },
      {
        path: 'table06',
        name: '表格6',
        meta: {
          icon: 'ios-list-box',
          title: 'table6'
        },
        component: () => import('@/view/table/table06.vue')
      },
      {
        path: 'table07',
        name: '表格7',
        meta: {
          icon: 'ios-list-box',
          title: 'table7'
        },
        component: () => import('@/view/table/table07.vue')
      },
      {
        path: 'modal01',
        name: '对话框01',
        meta: {
          icon: 'ios-list-box',
          title: 'modal6'
        },
        component: () => import('@/view/modal/modal01.vue')
      },
      {
        path: 'modal02',
        name: '对话框02',
        meta: {
          icon: 'ios-list-box',
          title: 'modal2'
        },
        component: () => import('@/view/modal/modal02.vue')
      },
      {
        path: 'modal03',
        name: '对话框03',
        meta: {
          icon: 'ios-list-box',
          title: 'modal3'
        },
        component: () => import('@/view/modal/modal03.vue')
      },{
        path: 'computed',
        name: 'computed01',
        meta: {
          icon: 'ios-list-box',
          title: 'computed01'
        },
        component: () => import('@/view/modal/computed.vue')
      },{
        path: 'form01',
        name: 'form01',
        meta: {
          icon: 'ios-list-box',
          title: 'form01'
        },
        component: () => import('@/view/modal/form01.vue')
      }
    ]
  },
  {
    path: '/project_page',
    name: 'project_page',
    component: Main,
    meta: {
      icon: 'md-briefcase',
      title: 'project_page'
    },
    children: [
      {
        path: 'project_list',
        name: 'project_list',
        meta: {
          icon: 'ios-list-box',
          title: 'project_list'
        },
        component: () => import('@/view/project/project.vue')
      },
      {
        path: 'project_details',
        name: 'project_details',
        meta: {
          icon: 'ios-paper',
          title: 'project_details'
        },
        component: () => import('@/view/update/update-table.vue')
      }
    ]
  },
  {
    path: '/contract_page',
    name: 'contract_page',
    component: Main,
    meta: {
      icon: 'md-paper',
      title: 'contract_page'
    },
    children: [
      {
        path: 'contract_list',
        name: 'contract_list',
        meta: {
          icon: 'ios-list-box',
          title: 'contract_list'
        },
        component: () => import('@/view/update/update-table.vue')
      },
      {
        path: 'contract_details',
        name: 'contract_details',
        meta: {
          icon: 'ios-paper',
          title: 'contract_details'
        },
        component: () => import('@/view/update/update-table.vue')
      }
    ]
  },
  {
    path: '/sampleRegiter_page',
    name: 'sampleRegiter_page',
    component: Main,
    meta: {
      icon: 'md-paper',
      title: 'sampleRegiter_page'
    },
    children: [
      {
        path: 'sampleRegiter_list',
        name: 'sampleRegiter_list',
        meta: {
          icon: 'ios-list-box',
          title: 'sampleRegiter_list'
        },
        component: () => import('@/view/update/update-table.vue')
      },
      {
        path: 'sampleRegiter_details',
        name: 'sampleRegiter_details',
        meta: {
          icon: 'ios-paper',
          title: 'sampleRegiter_details'
        },
        component: () => import('@/view/update/update-table.vue')
      }
    ]
  },
  {
    path: '/sample_page',
    name: 'sample_page',
    component: Main,
    meta: {
      icon: 'ios-flask-outline',
      title: 'sample_page'
    },
    children: [
      {
        path: 'sample_list',
        name: 'sample_list',
        meta: {
          icon: 'ios-list-box',
          title: 'sample_list'
        },
        component: () => import('@/view/sample/sample.vue')
      }
    ]
  },
  {
    path: '/analysis_page',
    name: 'analysis_page',
    component: Main,
    meta: {
      icon: 'md-laptop',
      title: 'analysis_page'
    },
    children: [
      {
        path: 'analysis_list',
        name: 'analysis_list',
        meta: {
          icon: 'ios-list-box',
          title: 'analysis_list'
        },
        component: () => import('@/view/update/update-table.vue')
      },
      {
        path: 'analysis_details',
        name: 'analysis_details',
        meta: {
          icon: 'ios-paper',
          title: 'analysis_details'
        },
        component: () => import('@/view/update/update-table.vue')
      }
    ]
  },
  {
    path: '/experiment_page',
    name: 'experiment_page',
    component: Main,
    meta: {
      icon: 'ios-flask',
      title: 'experiment_page'
    },
    children: [
      {
        path: 'experiment_list',
        name: 'experiment_list',
        meta: {
          icon: 'ios-list-box',
          title: 'experiment_list'
        },
        component: () => import('@/view/update/update-table.vue')
      },
      {
        path: 'experiment_details',
        name: 'experiment_details',
        meta: {
          icon: 'ios-paper',
          title: 'experiment_details'
        },
        component: () => import('@/view/update/update-table.vue')
      }
    ]
  },
  {
    path: '/product_page',
    name: 'product_page',
    component: Main,
    meta: {
      icon: 'md-laptop',
      title: 'product_page'
    },
    children: [
      {
        path: 'product_list',
        name: 'product_list',
        meta: {
          icon: 'ios-cube',
          title: 'product_list'
        },
        component: () => import('@/view/update/update-table.vue')
      },
      {
        path: 'product_details',
        name: 'product_details',
        meta: {
          icon: 'ios-paper',
          title: 'product_details'
        },
        component: () => import('@/view/update/update-table.vue')
      }
    ]
  },
  {
    path: '/material_page',
    name: 'material_page',
    component: Main,
    meta: {
      icon: 'ios-cart-outline',
      title: 'material_page'
    },
    children: [
      {
        path: 'material_list',
        name: 'material_list',
        meta: {
          icon: 'ios-cube',
          title: 'material_list'
        },
        component: () => import('@/view/update/update-table.vue')
      },
      {
        path: 'material_details',
        name: 'material_details',
        meta: {
          icon: 'ios-paper',
          title: 'material_details'
        },
        component: () => import('@/view/update/update-table.vue')
      }
    ]
  },
  {
    path: '/systemSet_page',
    name: 'systemSet_page',
    component: Main,
    meta: {
      icon: 'md-settings',
      title: 'systemSet_page'
    },
    children: [
      {
        path: 'user_page',
        name: 'user_page',
        meta: {
          icon: 'ios-people',
          title: 'user_page'
        },
        component: () => import('@/view/update/update-table.vue')
      },
      {
        path: 'location_Setting',
        name: 'location_Setting',
        meta: {
          icon: 'ios-paper',
          title: 'location_Setting'
        },
        component: () => import('@/view/update/update-table.vue')
      }
    ]
  },
  // {
  //   path: '/update',
  //   name: 'update',
  //   meta: {
  //     icon: 'md-cloud-upload',
  //     title: '数据上传'
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'update_table_page',
  //       name: 'update_table_page',
  //       meta: {
  //         icon: 'ios-document',
  //         title: '上传Csv'
  //       },
  //       component: () => import('@/view/update/update-table.vue')
  //     },
  //     {
  //       path: 'update_paste_page',
  //       name: 'update_paste_page',
  //       meta: {
  //         icon: 'md-clipboard',
  //         title: '粘贴表格数据'
  //       },
  //       component: () => import('@/view/i18n/i18n-page.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/excel',
  //   name: 'excel',
  //   meta: {
  //     icon: 'ios-stats',
  //     title: 'EXCEL导入导出'
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'upload-excel',
  //       name: 'upload-excel',
  //       meta: {
  //         icon: 'md-add',
  //         title: '导入EXCEL'
  //       },
  //       component: () => import('@/view/excel/upload-excel.vue')
  //     },
  //     {
  //       path: 'export-excel',
  //       name: 'export-excel',
  //       meta: {
  //         icon: 'md-download',
  //         title: '导出EXCEL'
  //       },
  //       component: () => import('@/view/excel/export-excel.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/tools_methods',
  //   name: 'tools_methods',
  //   meta: {
  //     hideInBread: true
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'tools_methods_page',
  //       name: 'tools_methods_page',
  //       meta: {
  //         icon: 'ios-hammer',
  //         title: '工具方法',
  //         beforeCloseName: 'before_close_normal'
  //       },
  //       component: () => import('@/view/tools-methods/tools-methods.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/i18n',
  //   name: 'i18n',
  //   meta: {
  //     hideInBread: true
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'i18n_page',
  //       name: 'i18n_page',
  //       meta: {
  //         icon: 'md-planet',
  //         title: 'i18n - {{ i18n_page }}'
  //       },
  //       component: () => import('@/view/i18n/i18n-page.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/error_store',
  //   name: 'error_store',
  //   meta: {
  //     hideInBread: true
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'error_store_page',
  //       name: 'error_store_page',
  //       meta: {
  //         icon: 'ios-bug',
  //         title: '错误收集'
  //       },
  //       component: () => import('@/view/error-store/error-store.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/error_logger',
  //   name: 'error_logger',
  //   meta: {
  //     hideInBread: true,
  //     hideInMenu: true
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'error_logger_page',
  //       name: 'error_logger_page',
  //       meta: {
  //         icon: 'ios-bug',
  //         title: '错误收集'
  //       },
  //       component: () => import('@/view/single-page/error-logger.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/directive',
  //   name: 'directive',
  //   meta: {
  //     hideInBread: true
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'directive_page',
  //       name: 'directive_page',
  //       meta: {
  //         icon: 'ios-navigate',
  //         title: '指令'
  //       },
  //       component: () => import('@/view/directive/directive.vue')
  //     }
  //   ]
  // },
  {
    path: '/multilevel',
    name: 'multilevel',
    meta: {
      icon: 'md-menu',
      title: '多级菜单'
    },
    component: Main,
    children: [
      {
        path: 'level_2_1',
        name: 'level_2_1',
        meta: {
          icon: 'md-funnel',
          title: '二级-1'
        },
        component: () => import('@/view/multilevel/level-2-1.vue')
      },
      {
        path: 'level_2_2',
        name: 'level_2_2',
        meta: {
          access: ['super_admin'],
          icon: 'md-funnel',
          showAlways: true,
          title: '二级-2'
        },
        component: parentView,
        children: [
          {
            path: 'level_2_2_1',
            name: 'level_2_2_1',
            meta: {
              icon: 'md-funnel',
              title: '三级'
            },
            component: () => import('@/view/multilevel/level-2-2/level-2-2-1.vue')
          },
          {
            path: 'level_2_2_2',
            name: 'level_2_2_2',
            meta: {
              icon: 'md-funnel',
              title: '三级'
            },
            component: () => import('@/view/multilevel/level-2-2/level-2-2-2.vue')
          }
        ]
      },
      {
        path: 'level_2_3',
        name: 'level_2_3',
        meta: {
          icon: 'md-funnel',
          title: '二级-3'
        },
        component: () => import('@/view/multilevel/level-2-3.vue')
      }
    ]
  },
  {
    path: '/argu',
    name: 'argu',
    meta: {
      hideInMenu: true
    },
    component: Main,
    children: [
      {
        path: 'params/:id',
        name: 'params',
        meta: {
          icon: 'md-flower',
          title: route => `{{ params }}-${route.params.id}`,
          notCache: true,
          beforeCloseName: 'before_close_normal'
        },
        component: () => import('@/view/argu-page/params.vue')
      },
      {
        path: 'query',
        name: 'query',
        meta: {
          icon: 'md-flower',
          title: route => `{{ query }}-${route.query.id}`,
          notCache: true
        },
        component: () => import('@/view/argu-page/query.vue')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]
