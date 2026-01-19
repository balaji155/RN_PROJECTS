#import "AppDelegate.h"
#import <React/RCTBundleURLProvider.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"my_news_app";
  // You can add your custom initial props in the dictionary below.
  self.initialProps = @{};

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#ifdef DEBUG
  // Specify the custom port here (e.g., 8082)
  // This will ensure that the app connects to Metro on port 8082 during development
  NSURL *jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
  NSString *jsCodeLocationString = [[jsCodeLocation absoluteString] stringByReplacingOccurrencesOfString:@"8081" withString:@"8082"];
  
  // Return the modified URL pointing to port 8082
  return [NSURL URLWithString:jsCodeLocationString];
#else
  // For release builds, load the bundled JavaScript
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
