/**
 * 修改Antd 的默认加载图标，改为按需加载，减小打包体积 使用Antd默认图标之前需要在此文件引用
 * webpack alias 添加:
 * {’@ant-design/icons/lib/dist$': path.resolve(__dirname, 'utils/antdIcon.js')}
 */
export { CloseCircleFill, CalendarOutline } from "@ant-design/icons";
