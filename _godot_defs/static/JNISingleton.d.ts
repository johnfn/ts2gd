
/**
 * The JNISingleton is implemented only in the Android export. It's used to call methods and connect signals from an Android plugin written in Java or Kotlin. Methods and signals can be called and connected to the JNISingleton as if it is a Node. See [url=https://en.wikipedia.org/wiki/Java_Native_Interface]Java Native Interface - Wikipedia[/url] for more information.
 *
*/
declare class JNISingleton extends Object  {

  
/**
 * The JNISingleton is implemented only in the Android export. It's used to call methods and connect signals from an Android plugin written in Java or Kotlin. Methods and signals can be called and connected to the JNISingleton as if it is a Node. See [url=https://en.wikipedia.org/wiki/Java_Native_Interface]Java Native Interface - Wikipedia[/url] for more information.
 *
*/
  new(): JNISingleton; 
  static "new"(): JNISingleton 





  connect<T extends SignalsOf<JNISingleton>>(signal: T, method: SignalFunction<JNISingleton[T]>): number;






}

