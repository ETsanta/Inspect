import request from "../untils/request"


const api = {
    Detection: "/rcs/replenishment/workStation", // 送至测试
    Qualified: "/mes/pda/qualifiedProductRegistration", // 产品转运
    Maintenance: "/mes/pda/nonQualifiedMaintenanceArea", // 维修转运
    Repair: "/mes/pda/nonQualifiedMaintenanceAreaToBuffer",// 修复转运
    Outbound: "/mes/pda/deliveryAreaOut",// 产品出库
    Shipment: "/mes/pda/callMaterial",// 出货转运
    Remove: "/mes/pda/deliveryAreaOutToBuffer",// 空货架转运
    CallNull: "/rcs/TaskSchedulingSheet/createFillingShelf", // 呼叫空货架
    getOrderCodeByStation: "/mes/pda/getWorkOrderByWorkStationCode",//根据点位所属类型查询工单列表
    getShelvesInfoByCode: "/mes/pda/getShelvesInfoByShelvesCode", //根据货架编号查询货架相关信息
}

export const detection = (body: any) => {
    return request.post(api.Detection, body)
}
export const Qualified = (body: any) => {
    return request.post(api.Qualified, body)
}
export const Maintenance = (params: any) => {
    return request.get(api.Maintenance, params)
}
export const Repair = (body: any) => {
    return request.post(api.Repair, body)
}
export const Outbound = (params: any) => {
    return request.get(api.Outbound, params)
}
export const Shipment = (params: any) => {
    return request.get(api.Shipment, params)
}
export const Remove = (params: any) => {
    return request.get(api.Remove, params)
}
export const CallNull = (body: any) => {
    return request.post(api.Detection, body)
}
export const getOrderCodeByStation = (params: any) => {
    return request.get(api.getOrderCodeByStation, params)
}
export const getShelvesInfoByCode = (params: any) => {
    return request.get(api.getShelvesInfoByCode, params)
}