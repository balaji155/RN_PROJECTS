//
//  HelloModule.swift
//  helle_native_module
//
//  Created by balaji.papisetty on 18/05/26.
//

import UIKit
import React

@objc(HelloModule)

class HelloModule: NSObject { 
  @objc static func requiresMainQueueSetup() -> Bool {
    return false
  }
  
  @objc func greet(_ name: String, resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) {
     resolver("Congrats, \(name)! You've successfully called a ios native module method from JavaScript.")
  }
  
}
