package com.helle_native_module.native_modules

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

class HelloModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext){
    override fun getName(): String = "HelloModule"
    @ReactMethod
    fun greet(name: String,promise: Promise){
        promise.resolve("Congrats one your first Android native module $name!")
    }
}