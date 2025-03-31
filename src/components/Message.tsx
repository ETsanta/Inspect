import notifee from "@notifee/react-native";
import { Button } from 'react-native';


export default function Message() {
    async function onDisplayNotification() {

        // 请求权限（iOS 需要）
        await notifee.requestPermission();

        // 创建一个频道（Android 需要）
        const channelId = await notifee.createChannel({
            id: "default",
            name: "默认频道",
        });

        // 显示一个通知
        await notifee.displayNotification({
            title: "我是通知的标题",
            body: "你好，我是通知",
            android: {
                channelId,
                // 如果你想要通知被按下时打开应用，需要 pressAction
                pressAction: {
                    id: "default",
                },
            },
        });
    }
    return (
        <Button
            title="显示通知"
            onPress={() => onDisplayNotification()}
        />
    )
}