/**
 * PolygonElement.
 * 面形状クラス
 * @param 
 * @return
 */

/* メンバ変数 */
function PolygonElement(){
	this.m_mesh	= null;							//three.jsで面形状を描画するためのクラス
	DrawModelBase.apply(this,arguments);		//DrawModelBaseを継承するための記述1
};
PolygonElement.prototype = new DrawModelBase;	//DrawModelBaseを継承するための記述2

//描画モデル実体の取得
PolygonElement.prototype.getDrawElement = function(){
	return this.m_mesh;
};


/**
 * createElement.
 * 描画エレメントの作成
 * @param	vertexBuff	: 頂点バッファ配列
 * @param	indexBuff	: インデックスバッファ配列
 * @param	colorBuff	: カラーバッファ配列
 * @return
 */	
PolygonElement.prototype.createElement = function( vertexBuff, indexBuff, colorBuff ){
	if((vertexBuff.length == 0) || (vertexBuff.length%3 != 0)){
		return ERROR_CODE_FAILD_CREEATE_INSTANCE;
	}
	if((indexBuff.length == 0) || (indexBuff.length%3 != 0)){
		return ERROR_CODE_FAILD_CREEATE_INSTANCE;
	}
	var vertexCount = vertexBuff.length / 3;//頂点数
	if((colorBuff.length == 0) || (colorBuff.length != vertexCount)){
		return ERROR_CODE_FAILD_CREEATE_INSTANCE;
	}
		
	//ジオメトリの作成
	var geometry = new THREE.Geometry();
	
	//①頂点バッファの設定	
	for(var i=0;i<vertexCount;i++){
		var oneVertex = [0,0,0];
		//一つ分の頂点情報を取得
		for(var j=0;j<3;j++){
			oneVertex[j] = vertexBuff[i*3 + j];
		}
		//頂点をジオメトリに登録
		var oneVector = new THREE.Vector3(oneVertex[0], oneVertex[1], oneVertex[2]);
		geometry.vertices.push(oneVector);
	}
	
	//②インデックスバッファの設定
	/* A→B→Cの順で格納
	 * B        A
	 * ◯------◯
	 * |     /
	 * |   /
	 * | /
	 * ◯ 
	 * C
	 */
	var triangleCount = indexBuff.length / 3;//三角形数
	for(var i=0;i<triangleCount;i++){
		var oneTriangle = [0,0,0];
		//一つ分の三角形分割情報を格納
		for(var j=0;j<3;j++){
			oneTriangle[j] = indexBuff[i*3 + j];
 		}
 		//三角形分割情報をジオメトリに登録
 		var oneFace = new THREE.Face3( oneTriangle[0], oneTriangle[1], oneTriangle[2] );
 		geometry.faces.push(oneFace);
	}
	
	// 法線ベクトルの自動計算
	geometry.computeFaceNormals();
	geometry.computeVertexNormals();
	
	//③カラーの設定
	var colorCount = 0;
	for(var i=0;i<triangleCount;i++){
		var oneFace = geometry.faces[i];
		for(var j=0;j<3;j++){
			var oneIndex = indexBuff[i*3 + j];
			var oneColor = colorBuff[oneIndex];
			oneFace.vertexColors[j] = new THREE.Color( oneColor );
			colorCount++;
		}
	}
	
	var material = new THREE.MeshBasicMaterial({ vertexColors: THREE.VertexColors });
	//Three.Meshの作成
	this.m_mesh = new THREE.Mesh( geometry, material );
	
	return ERROR_CODE_SUCCESS;
};