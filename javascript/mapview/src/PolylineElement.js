/**
 * PolylineElement.
 * 線形状クラス
 * @param 
 * @return
 */

/* メンバ変数 */
function PolylineElement(){
	this.m_line	= null;							//three.jsで線形状を描画するためのクラス
	DrawModelBase.apply(this,arguments);		//DrawModelBaseを継承するための記述1
};
PolylineElement.prototype = new DrawModelBase;	//DrawModelBaseを継承するための記述2

//描画モデル実体の取得
PolylineElement.prototype.getDrawElement = function(){
	return this.m_line;
};


/**
 * createElement.
 * 描画エレメントの作成
 * @param	vertexBuff	: 頂点バッファ配列
 * @param	colorBuff	: カラーバッファ配列
 * @return
 */	
DrawModelBase.prototype.createElement = function( vertexBuff, colorBuff , lineWidth){
	if((vertexBuff.length == 0) || (vertexBuff.length%3 != 0)){
		return ERROR_CODE_FAILD_CREEATE_INSTANCE;
	}
	var vertexCount = vertexBuff.length / 3;//頂点数
	if((colorBuff.length == 0) || (colorBuff.length != vertexCount)){
		return ERROR_CODE_FAILD_CREEATE_INSTANCE;
	}
	if(lineWidth < 1){ return; }
		
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
		
	//③カラーの設定
	for(var i=0;i<vertexCount;i++){
		geometry.colors[i] = new THREE.Color(colorBuff[i]);
	}
	
	var material = new THREE.LineBasicMaterial( {linewidth: lineWidth,color: 0xffffff,vertexColors: THREE.VertexColors});

	//Three.Lineの作成
	this.m_line = new THREE.Line( geometry, material );
	
	return ERROR_CODE_SUCCESS;
};