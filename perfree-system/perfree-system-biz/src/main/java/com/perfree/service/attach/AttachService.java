package com.perfree.service.attach;

import com.baomidou.mybatisplus.extension.service.IService;
import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.attach.vo.AttachPageReqVO;
import com.perfree.controller.auth.attach.vo.AttachUpdateVO;
import com.perfree.controller.auth.attach.vo.AttachUploadVO;
import com.perfree.model.Attach;

import java.io.IOException;
import java.util.List;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author perfree
 * @since 2023-09-27
 */
public interface AttachService extends IService<Attach> {

    /**
     * 附件分页查询
     * @param pageVO pageVO
     * @return PageResult<Attach>
     */
    PageResult<Attach> attachPage(AttachPageReqVO pageVO);

    /**
     * 附件创建
     * @param attach attach
     * @return Attach
     */
    Attach create(AttachUploadVO attach);

    /**
     * 附件删除
     * @param id id
     * @return Boolean
     */
    Boolean del(Integer id);

    /**
     * 附件获取文件内容
     * @param configId configId
     * @param path path
     * @return byte[]
     * @throws IOException IOException
     */
    byte[] getFileContent(Integer configId, String path);

    /**
     * 获取所有附件分组
     * @return List<AttachGroupRespVO>
     */
    List<Attach> getAllAttachGroup();

    /**
     * 附件修改
     * @param attachUpdateVO attachUpdateVO
     * @return Boolean
     */
    Boolean updateAttach(AttachUpdateVO attachUpdateVO);

    /**
     * 通过url下载并上传附件
     * @param url url
     * @return Attach
     */
    Attach uploadAttachByUrl(String url);

}
