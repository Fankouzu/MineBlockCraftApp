package com.mineblockcraftapp;
//https://github.com/crazycodeboy/react-native-splash-screen
import android.os.Bundle; // here
import org.devio.rn.splashscreen.SplashScreen; // here

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {
  //https://github.com/crazycodeboy/react-native-splash-screen
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    SplashScreen.show(this);  // here
    super.onCreate(savedInstanceState);
  }
  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "MineBlockCraftApp";
  }
}
