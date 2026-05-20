package com.helle_native_module.native_modules
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.NativeModule
import com.facebook.react.uimanager.ViewManager

class HelloPackage : ReactPackage {
    override fun createNativeModules(p0: ReactApplicationContext): List<NativeModule?> =
        listOf(
        HelloModule(p0)
        )

    override fun createViewManagers(p0: ReactApplicationContext): List<ViewManager<*, *>?> = emptyList()
}