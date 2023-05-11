// 导入http中创建的axios实例
import http from '../api';

export const getTreeData = (params) => http("get", `/api/getTreeData`, params)//获取最外层树组件的结构

export const getTreeChildData = (params) => http("get", `/api/getTreeChildData`, params)//获取非最外层的对应层的数据







