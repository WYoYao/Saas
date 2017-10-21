package com.sagacloud.test;

import java.util.Properties;

import org.python.core.PyFunction;
import org.python.core.PyInteger;
import org.python.core.PyObject;
import org.python.core.PyString;
import org.python.util.PythonInterpreter;

public class PythonTest {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
	     Properties props = new Properties();  
//	     props.put("python.home","C:/Python27/Lib");  
	     props.put("python.console.encoding", "UTF-8");// Used to prevent: console: Failed to install '': java.nio.charset.UnsupportedCharsetException: cp0. 
	     props.put("python.security.respectJavaAccessibility", "false"); //don't respect java accessibility, so that we can access protected members on subclasses  
	     props.put("python.import.site","false");  
	     Properties preprops = System.getProperties();  
	     PythonInterpreter.initialize(preprops, props, new String[0]);  
	          
		PythonInterpreter interpreter = new PythonInterpreter();
	    interpreter.execfile("E:\\workspace\\super-class\\src\\main\\resources\\python\\my_test.py");
	    PyFunction adder = (PyFunction) interpreter.get("adder", PyFunction.class);  
	    
        int a = 30, b = 50;  
        PyObject pyobj = adder.__call__(new PyInteger(a), new PyInteger(b));  
        System.out.println("anwser = " + pyobj.toString());  
        PyFunction mytest = (PyFunction) interpreter.get("mytest", PyFunction.class);  
        PyObject pyobj2 = mytest.__call__(new PyString("this is java project!!!"));  
        System.out.println(pyobj2.toString());  
        interpreter.close();  

	}

}
