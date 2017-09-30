package com.sagacloud.saas.service;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;

import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;


public abstract class BaseTransmissionService extends BaseService {
	
	protected void createCell(Workbook wkbook, Sheet sheet, int rowNumber, int cellNumber, int style, String content){
		
		Row row = sheet.getRow(rowNumber);
		if(row==null){
			row = sheet.createRow(rowNumber);
		}
		row.setHeightInPoints(28f);
		
		Cell cell = row.getCell(cellNumber);
		if(cell==null){
			cell = row.createCell(cellNumber);
		}
		
		
		
		int  width = 6 * 256;
		CellStyle cellStyle = wkbook.createCellStyle();
		cellStyle.setAlignment(CellStyle.ALIGN_CENTER);
		cellStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
		if(style==1){
//			cellStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
//			cellStyle.setFillForegroundColor(IndexedColors.LIGHT_GREEN.getIndex());
			width = 15 * 256;
		} else if(style == 0){
//			HSSFFont font=wkbook.createFont();
			Font font=wkbook.createFont();
//	        font.setColor(HSSFColor.BLACK.index);//HSSFColor.VIOLET.index //字体颜色
	        font.setFontHeightInPoints((short)20);
	        font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);         //字体增粗
	        cellStyle.setFont(font);
		}
		
		sheet.setColumnWidth(cellNumber, width);
		cell.setCellStyle(cellStyle);
		if(content==null){
			content="";
		}
		cell.setCellValue(content);
	}
	
	protected String getCellStringValue(Cell cell,boolean isDouble) throws Exception{
		String value = null;
		if(cell!=null){
			switch (cell.getCellType()){
				case Cell.CELL_TYPE_STRING :
					value = cell.getStringCellValue();
					break;
				case Cell.CELL_TYPE_NUMERIC :
					if(isDouble){
						value = new BigDecimal(new Double(cell.getNumericCellValue()).toString()).toString();
					}else{
						if(DateUtil.isCellDateFormatted(cell)){
							value = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(cell.getDateCellValue());
						}else{
							value = new BigDecimal(new Double(cell.getNumericCellValue()).toString()).longValue() + "";
						}
					}
					
					break;
				case Cell.CELL_TYPE_BOOLEAN :
					value = "" + cell.getBooleanCellValue();
					break;
				case Cell.CELL_TYPE_BLANK:
					value = "";
					break;
				case Cell.CELL_TYPE_ERROR:
					throw new Exception("不能辨析CELL_TYPE_ERROR");
				case Cell.CELL_TYPE_FORMULA :
					value = cell.getCellFormula();
					break;	
			}
		}else{
			value = "";
		}
		return value;
	}
	
}
