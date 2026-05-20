//
//  NativeModuleManager.m
//  helle_native_module
//
//  Created by balaji.papisetty on 18/05/26.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(HelloModule, NSObject)

RCT_EXTERN_METHOD(
                  greet:(NSString *)name
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
                  )
@end

