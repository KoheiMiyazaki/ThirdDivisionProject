/**
 * PolygonElementInfo.
 * 面形状クラス
 * @param 
 * @return
 */

/* メンバ変数 */
function PolygonElementInfo(){
	this.m_triangleArr = new Array();				//三角形分割情報格納配列
	PolylineElementInfo.apply(this,arguments);		//継承するための記述1
};
PolygonElementInfo.prototype = new PolylineElementInfo;	//継承するための記述2

/* 単純なセッタ・ゲッタ */
//三角形分割情報配列の設定
PolylineElementInfo.prototype.setTriangleArr = function(triangleArr){
	this.m_triangleArr = triangleArr;
};
//三角形分割情報配列の取得
PolylineElementInfo.prototype.getTriangleArr = function(){
	return this.m_triangleArr;
};

/**
 * createElement.
 * 描画エレメントの作成
 * @param	geometry	: 頂点バッファ配列
 * @param	material	: インデックスバッファ配列
 * @return	result		: エラーコード
 */	
PolygonElementInfo.prototype.createElement = function( geometry ){
	var result = ERROR_CODE.ERROR_CODE_INVALID;
	
	if((this.m_offsetArr == null) || (this.m_offsetArr.length == 0)){
		return result;
	}
	if((this.m_triangleArr == null) || (this.m_triangleArr.length == 0)){
		return result;
	}
	
	//①頂点バッファの設定	
	var offsetCount = this.m_offsetArr.length;
	for(var i=0;i<offsetCount;i++){
		var oneVertex = [0,0,0];
		//一つ分の頂点情報を取得
		for(var j=0;j<3;j++){
			oneVertex[j] = this.m_offsetArr[i][j];
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
	var triangleCount = this.m_triangleArr.length;//三角形数
	for(var i=0;i<triangleCount;i++){
		var oneTriangle = [0,0,0];
		//一つ分の三角形分割情報を格納
		for(var j=0;j<3;j++){
			oneTriangle[j] = this.m_triangleArr[i][j];
 		}
 		//三角形分割情報をジオメトリに登録
 		var oneFace = new THREE.Face3( oneTriangle[0], oneTriangle[1], oneTriangle[2] );
 		geometry.faces.push(oneFace);
	}
		
	//③カラーの設定
	for(var i=0;i<triangleCount;i++){
		var oneFace = geometry.faces[i];
		for(var j=0;j<3;j++){
			oneFace.vertexColors[j] = new THREE.Color( this.m_color );
		}
	}
	
	return ERROR_CODE.ERROR_CODE_SUCCESS;
};