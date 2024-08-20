package com.demo.websocket;

import jakarta.websocket.*;
import jakarta.websocket.server.ServerEndpoint;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.concurrent.atomic.AtomicInteger;

@ServerEndpoint("/webSocket/test")
@Component
public class WebSocketTest {

    private static final Logger LOGGER = LoggerFactory.getLogger(WebSocketTest.class);
    private static final AtomicInteger onlineCount = new AtomicInteger(0);

    @OnOpen
    public void onOpen(Session session) {
        onlineCount.incrementAndGet(); // 在线数+1
        LOGGER.info("插件websocket, 有新连接加入，当前在线人数为：{}", onlineCount.get());
    }

    @OnClose
    public void onClose(Session session) {
        onlineCount.decrementAndGet(); // 在线数减1
        LOGGER.info("插件websocket, 有一连接关闭，当前在线人数为：{}", onlineCount.get());
    }

    @OnMessage
    public void onMessage(String message, Session session) {
        LOGGER.info("插件websocket, 服务端收到客户端的消息：{}", message);
        this.sendMessage("Hello, " + message, session);
    }

    @OnError
    public void onError(Session session, Throwable error) {
        LOGGER.error("插件websocket,发生错误：{}", error.getMessage(), error);
    }

    private void sendMessage(String message, Session toSession) {
        try {
            LOGGER.info("插件websocket, 服务端给客户端发送消息：{}", message);
            toSession.getBasicRemote().sendText(message);
        } catch (Exception e) {
            LOGGER.error("服务端给客户端发送消息失败：{}", e.getMessage(), e);
        }
    }
}
