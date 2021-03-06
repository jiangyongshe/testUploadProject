package com.cwa.client.utils;

import java.io.*;
import java.awt.*;
import java.awt.image.*;
import javax.imageio.ImageIO;

import org.springframework.web.multipart.MultipartFile;

import com.sun.image.codec.jpeg.*;
/**
 * 图片压缩处理
 * @author 崔素强
 */
public class ImgCompress {
	private Image img;
	private int width;
	private int height;
	private final int defautWidth=1920;
	private final int defautHeight=1080;
	/**
	 * 构造函数
	 */
	public ImgCompress(MultipartFile file) throws IOException {
		img = ImageIO.read(file.getInputStream());      // 构造Image对象
		width = img.getWidth(null);    // 得到源图宽
		height = img.getHeight(null);  // 得到源图长
		System.out.println("+=+-+！~~~width:"+width+"===height:"+height);
	}
	/**
	 * 构造函数
	 */
	public ImgCompress(File file) throws IOException {
		img = ImageIO.read(file);      // 构造Image对象
		width = img.getWidth(null);    // 得到源图宽
		height = img.getHeight(null);  // 得到源图长
		System.out.println("+=+-+！~~~width:"+width+"===height:"+height);
	}
	/**
	 * 按照宽度还是高度进行压缩
	 * @param w int 最大宽度
	 * @param h int 最大高度
	 */
	public void resizeFix(String path) throws IOException {
		if(width>defautWidth){
			resizeByWidth(defautWidth,path);
		}else{
			if(height>defautHeight){
				resizeByHeight(defautHeight,path);
			}else{
				resizeByHeight(height,path);
			}
		}
		/*if (width / height > w / h) {
			resizeByWidth(w,path);
		} else {
			resizeByHeight(h,path);
		}*/
	}
	/**
	 * 以宽度为基准，等比例放缩图片
	 * @param w int 新宽度
	 */
	public void resizeByWidth(int w,String path) throws IOException {
		//if(w>width){w=width;}
		int h = (int) (height * w / width);
		resize(w, h,path);
	}
	/**
	 * 以高度为基准，等比例缩放图片
	 * @param h int 新高度
	 */
	public void resizeByHeight(int h,String path) throws IOException {
		//if(h>height){h=height;}
		int w = (int) (width * h / height);
		resize(w, h,path);
	}
	/**
	 * 强制压缩/放大图片到固定的大小
	 * @param w int 新宽度
	 * @param h int 新高度
	 * @param path String 生成文件路径
	 */
	public void resize(int w, int h,String path) throws IOException {
		// SCALE_SMOOTH 的缩略算法 生成缩略图片的平滑度的 优先级比速度高 生成的图片质量比较好 但速度慢
		BufferedImage image = new BufferedImage(w, h,BufferedImage.TYPE_INT_RGB ); 
		image.getGraphics().drawImage(img, 0, 0, w, h, null); // 绘制缩小后的图
		File destFile = new File(path);
		FileOutputStream out = new FileOutputStream(destFile); // 输出到文件流
		// 可以正常实现bmp、png、gif转jpg
		JPEGImageEncoder encoder = JPEGCodec.createJPEGEncoder(out);
		encoder.encode(image); // JPEG编码
		out.close();
	}
}