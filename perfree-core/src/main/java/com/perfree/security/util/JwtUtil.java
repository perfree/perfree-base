package com.perfree.security.util;

import com.perfree.security.SecurityConstants;
import com.perfree.security.vo.LoginUserVO;
import com.perfree.system.api.user.UserApi;
import com.perfree.system.api.user.dto.UserRespDTO;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.xml.bind.DatatypeConverter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;

/**
 * @author Perfree
 * @description JWT工具类
 * @date 15:14 2023/9/28
 */
@Component
@RequiredArgsConstructor
public class JwtUtil {
    private static final byte[] secretKey = DatatypeConverter.parseBase64Binary(SecurityConstants.JWT_SECRET_KEY);

    private static final byte[] refreshKey = DatatypeConverter.parseBase64Binary(SecurityConstants.JWT_REFRESH_KEY);

    private static UserApi userApi;
    @Autowired
    public JwtUtil(UserApi userApi) {
        JwtUtil.userApi = userApi;
    }

    /**
     * @param account    账户
     * @param isRemember 是否记住账户
     * @return java.lang.String
     * @author Perfree
     * @description 根据用户生成 token
     * @date 15:14 2023/9/28
     */
    public static String generateToken(String account, Boolean isRemember) {
        //  过期时间
        long expirationTime = isRemember ? SecurityConstants.TOKEN_EXPIRATION_REMEMBER_TIME : SecurityConstants.TOKEN_EXPIRATION_TIME;
        //  生成token
        return Jwts.builder()
                //  生成签证信息
                .setHeaderParam("typ", SecurityConstants.TOKEN_TYPE)
                .signWith(Keys.hmacShaKeyFor(secretKey))
                //  所有人
                .setSubject(account)
                //  JWT主体
                .setIssuer(SecurityConstants.TOKEN_ISSUER)
                //  签发时间
                .setIssuedAt(new Date())
                .setAudience(SecurityConstants.TOKEN_AUDIENCE)
                //  设置有效时间
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime * 1000))
                .compact();
    }

    /**
     * @param account 账号
     * @return java.lang.String
     * @author Perfree
     * @description 生成refresh_token
     * @date 15:15 2023/9/28
     */
    public static String getRefreshToken(String account, Date expiration) {
        return Jwts.builder()
                .signWith(Keys.hmacShaKeyFor(refreshKey))
                .setSubject(account)
                .setExpiration(expiration)
                .compact();
    }

    /**
     * @param token token
     * @return boolean
     * @author Perfree
     * @description 校验token是否有效
     * @date 15:15 2023/9/28
     */
    public static boolean verifyToken(String token) {
        getTokenBody(token);
        return true;
    }

    /**
     * @param refreshToken refreshToken
     * @return boolean
     * @author Perfree
     * @description 校验refreshToken是否有效
     * @date 15:15 2023/9/28
     */
    public static boolean verifyRefreshToken(String refreshToken) {
        try{
            getRefreshTokenBody(refreshToken);
            return true;
        }catch (Exception e) {
            return false;
        }
    }

    /**
     * @param token token
     * @return org.springframework.security.core.Authentication
     * @author Perfree
     * @description 根据token获取用户认证信息
     * @date 15:15 2023/9/28
     */
    public static Authentication getAuthentication(String token) {
        Claims claims;
        try {
            claims = getTokenBody(token);
        } catch (ExpiredJwtException e) {
            claims = e.getClaims();
        }
        //  获取用户
        UserRespDTO byAccount = userApi.findByAccount(claims.getSubject());
        LoginUserVO loginUser = new LoginUserVO();
        loginUser.setId(byAccount.getId());
        loginUser.setAccount(byAccount.getAccount());
        return new UsernamePasswordAuthenticationToken(loginUser, token, null);
    }

    /**
     * @param token token
     * @return io.jsonwebtoken.Claims
     * @author Perfree
     * @description 从token中获取用户信息
     * @date 15:16 2023/9/28
     */
    private static Claims getTokenBody(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    /**
     * @param refreshToken refreshToken
     * @return io.jsonwebtoken.Claims
     * @author Perfree
     * @description 从refreshToken中获取用户信息
     * @date 15:16 2023/9/28
     */
    public static Claims getRefreshTokenBody(String refreshToken) {
        return Jwts.parserBuilder()
                .setSigningKey(refreshKey)
                .build()
                .parseClaimsJws(refreshToken)
                .getBody();
    }
}
