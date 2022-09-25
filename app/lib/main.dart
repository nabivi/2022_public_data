import 'package:flutter/material.dart';
import 'dart:io';
import 'dart:async';

import 'package:flutter_webview_pro/webview_flutter.dart';
import 'package:permission_handler/permission_handler.dart';

void main(){
  runApp(const D_Eco());
}

class D_Eco extends StatelessWidget {
  const D_Eco({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      home: Home(),
      debugShowCheckedModeBanner: false,
    );
  }
}

class Home extends StatefulWidget {
  const Home({Key? key}) : super(key: key);

  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {
  WebViewController? _controller;

  final Completer<WebViewController> _completerController = Completer<WebViewController>();

  @override
  void initState() {
    super.initState();
    // Enable virtual display.
    if (Platform.isAndroid) WebView.platform = SurfaceAndroidWebView();
    //checkPermission();
  }

  Future<bool> checkPermission() async{
    Map<Permission, PermissionStatus> statuses =
    await[Permission.camera].request(); //여러가지 퍼미션을하고싶으면 []안에 추가하면된다. (팝업창이뜬다)

    bool per= true;

    statuses.forEach((permission, permissionStatus){
      if(!permissionStatus.isGranted){
        per = false; //하나라도 허용이안됐으면 false
      }
    });

    return per;
  }

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      onWillPop: () => _goBack(context),
      child: WebView(
        onWebViewCreated: (WebViewController webViewController) {
          _completerController.future.then((value) => _controller = value);
          _completerController.complete(webViewController);
        },
        initialUrl: "https://cse-ht.web.app/",
//        initialUrl: 'http://naver.com',
        javascriptMode: JavascriptMode.unrestricted,
      ),
    );
  }

  Future<bool> _goBack(BuildContext context) async{
    if(await _controller!.canGoBack()){
      _controller!.goBack();
      return Future.value(false);
    }else{
      return Future.value(true);
    }
  }
}

