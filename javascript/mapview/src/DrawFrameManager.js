/**
 * DrawFrameManager.
 * 描画関連を管理するクラス
 * @param 
 * @return
 */

/* WebGL定数 */
const GL_ORTHO_PARAM_CAMERA_WIDTH		=   720; 	//カメラ横幅
const GL_ORTHO_PARAM_CAMERA_HEIGHT		=   720;	//カメラ縦幅
const GL_ORTHO_PARAM_NEAR				= -1000;	//正射影モードnear
const GL_ORTHO_PARAM_FAR				=  1000;	//正射影モードfar

/* メンバ変数 */
function DrawFrameManager(){
	g_scene			= null;				//シーン
	g_camera		= null;				//カメラ
	g_renderer		= null;				//レンダラ
	g_mapMeshArr	= new Array();		//地図メッシュ格納配列
};

/**
 * initWebGL.
 * WebGLの初期化
 * @param 
 * @return
 */	
DrawFrameManager.prototype.initWebGL = function(){
	//シーンの作成・メンバ変数に設定
	g_scene		= new THREE.Scene();
	//カメラサイズ
	var left	= -(GL_ORTHO_PARAM_CAMERA_WIDTH*0.5);	//左端X座標
	var right	= (GL_ORTHO_PARAM_CAMERA_WIDTH*0.5);	//右端X座標
	var top		= (GL_ORTHO_PARAM_CAMERA_HEIGHT*0.5);	//上端Y座標
	var bottom	= -(GL_ORTHO_PARAM_CAMERA_HEIGHT*0.5);	//下端Y座標
	var near   	= GL_ORTHO_PARAM_NEAR;					//near
	var far    	= GL_ORTHO_PARAM_FAR;					//far
	//正射影モードのカメラを作成・メンバ変数に設定
	g_camera 	= new THREE.OrthographicCamera( left, right, top, bottom, near, far);
	//カメラ位置
	g_camera.position.set( 0, 0, 0 );
	g_scene.add(g_camera);//シーンにカメラを追加
	/*
	 * WebGLRenderer…リッチな処理。Three.jsの全機能が使える。
	 * CanvasRenderer…雑な処理。低スペックPC,スマートフォン,タブレットで３D表示可能。Three.jsの一部の機能しか使えない。
	 */
	//レンダラの作成・メンバ変数に設定
	g_renderer = new THREE.WebGLRenderer();
	g_renderer.setSize( GL_ORTHO_PARAM_CAMERA_WIDTH, GL_ORTHO_PARAM_CAMERA_HEIGHT );
	var color = 0xffffff;
	g_renderer.setClearColor( new THREE.Color(color) );//背景色
	document.body.appendChild( g_renderer.domElement );
	
};

/**
 * drawFrame.
 * 毎フレーム行われる描画関数
 * @param 
 * @return
 */	
DrawFrameManager.prototype.drawFrame = function(){
	//drawFrameLoopを再帰的に呼び出す
	( function drawFrameLoop () {
		requestAnimationFrame( drawFrameLoop );			//次のフレーム描画を登録

		/* ▽ 毎フレーム行う処理内容を記述 ▽ */
		if(g_mapMeshArr.length == 0){ return; }
		
		//地図メッシュを描画
		drawMapMesh();
		
		g_renderer.render( g_scene, g_camera );			//描画処理
		/* △ 毎フレーム行う処理内容を記述 △ */

  } )();
};

/**
 * drawMapMesh.
 * 地図メッシュ配列の内容を描画する関数
 * @param 
 * @return
 */	
function drawMapMesh(){
	if(g_mapMeshArr.length == 0){
		return;
	}
	var mapMeshCount = g_mapMeshArr.length;
	for(var i=0;i<mapMeshCount;i++){
		//地図メッシュの取得
		var oneMapMesh = g_mapMeshArr[i];
		if(oneMapMesh == null){ continue; }
		//描画モデルの取得
		var oneDrawModel = oneMapMesh.getDrawModel();
		if(oneDrawModel == null){ continue; }
		var isAddSceneFl = oneDrawModel.getIsAddScene();
		if(!isAddSceneFl){//シーンに追加していない場合
			var oneDrawElement = oneDrawModel.getDrawElement();
			if(oneDrawElement == null){ continue; }
			g_scene.add(oneDrawElement);//シーンに追加
			oneDrawModel.setIsAddScene(true);//シーン追加状態を保持
		}
		
	}
};

/**
 * craeteTestMapMesh.
 * 試作データ登録関数
 * @param 
 * @return
 */	
DrawFrameManager.prototype.craeteTestMapMesh = function(){
	//地図メッシュの作成
	var samplePolygonMesh	= new MapMesh();
	//描画モデルの作成
	var polygonElement		= new PolygonElement();
	var polygonVertexBuff	= [ 360,30,0, -360,30,0, -360,-30,0, 360,-30,0];
	var polygonIndexBuff	= [ 0,1,2, 0,2,3];	
	var polygonColorBuff	= [	0xe6e6e6, 0xe6e6e6, 0xe6e6e6, 0xe6e6e6];
	polygonElement.createElement(polygonVertexBuff,polygonIndexBuff,polygonColorBuff);
	//メッシュに描画モデルを設定
	samplePolygonMesh.setDrawModel(polygonElement);
	//描画地図メッシュ配列に追加
	g_mapMeshArr.push(samplePolygonMesh);
	
	//地図メッシュの作成
	var samplePolylineMesh	= new MapMesh();
	//描画モデルの作成
	var polylineElement		= new PolylineElement();
	var polylineVertexBuff	= [ 360,30,0, -360,30,0, -360,-30,0, 360,-30,0 ,360,30,0 ];	
	var polylineColorBuff	= [	0xef008c, 0xef008c, 0xef008c, 0xef008c, 0xef008c ];
	var lineWidth = 5;
	polylineElement.createElement(polylineVertexBuff,polylineColorBuff,lineWidth);
	//メッシュに描画モデルを設定
	samplePolylineMesh.setDrawModel(polylineElement);
	g_mapMeshArr.push(samplePolylineMesh);
	
	return;
};