package com.demo.controller.demo;

import com.alibaba.excel.EasyExcel;
import com.alibaba.excel.util.ListUtils;
import com.demo.controller.demo.vo.*;
import com.demo.convert.DemoConvert;
import com.demo.model.Demo;
import com.demo.service.demo.DemoService;
import com.perfree.commons.common.CommonResult;
import com.perfree.commons.common.PageResult;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

import static com.perfree.commons.common.CommonResult.success;

@RestController
@Tag(name = "系统配置相关接口")
@RequestMapping("api/auth/plugin-demo/demo")
public class DemoController {

    @Resource
    private DemoService demoService;

    @Resource
    private DemoConvert demoConvert;


    @PostMapping("/page")
    @Operation(summary = "分页列表示例")
    public CommonResult<PageResult<DemoRespVO>> page(@RequestBody DemoPageReqVO pageVO) {
        PageResult<Demo> demoPageResult = demoService.demoPage(pageVO);
        return success(demoConvert.convertPageResultVO(demoPageResult));
    }

    @PostMapping("/add")
    @Operation(summary = "添加示例")
    public CommonResult<DemoRespVO> add(@RequestBody @Valid DemoAddReqVO demoAddReqVO) {
        Demo demo = demoService.addDemo(demoAddReqVO);
        return success(demoConvert.convertRespVO(demo));
    }

    @PutMapping("/update")
    @Operation(summary = "更新示例")
    public CommonResult<DemoRespVO> update(@RequestBody @Valid DemoUpdateReqVO demoUpdateReqVO) {
        Demo demo = demoService.updateLink(demoUpdateReqVO);
        return success(demoConvert.convertRespVO(demo));
    }

    @GetMapping("/get")
    @Operation(summary = "获取示例")
    public CommonResult<DemoRespVO> get(@RequestParam(value = "id") Integer id) {
        return success(demoConvert.convertRespVO(demoService.getById(id)));
    }

    @DeleteMapping("/del")
    @Operation(summary = "删除示例")
    public CommonResult<Boolean> del(@RequestParam(value = "id") Integer id) {
        return success(demoService.del(id));
    }


    @GetMapping("/dependencyTest")
    @Operation(summary = "插件新增外部依赖示例(EasyExcel)")
    public void dependencyTest(HttpServletResponse response) {
        try{
            response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            response.setHeader("Content-Disposition", "attachment; filename=\"example.xlsx\"");
            EasyExcel.write(response.getOutputStream(), ExcelDataVO.class).sheet().doWrite(genData());
        }catch (Exception ignored) {}
    }

    /**
     * 生成excel数据
     * @return List<ExcelDataVO>
     */
    private List<ExcelDataVO> genData() {
        List<ExcelDataVO> list = ListUtils.newArrayList();
        for (int i = 0; i < 10; i++) {
            ExcelDataVO data = new ExcelDataVO();
            data.setString("字符串" + i);
            data.setDate(new Date());
            data.setDoubleData(0.56);
            list.add(data);
        }
        return list;
    }


}
