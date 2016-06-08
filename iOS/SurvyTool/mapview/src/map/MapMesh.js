/**
 * MapMesh.
 * 地図メッシュクラス
 * @param 
 * @return
 */

/* データ種別 */
const DATA_TYPE = {
 DATA_TYPE_INVALID		:-1,	//-1:不正なデータ
 DATA_TYPE_FULLVECTOR	: 0,	// 0:フルベクトル
 DATA_TYPE_TEXT			: 1,	// 1:注記
 NUM_DATA_TYPE			: 2		//  :データ種別数
};

function MapMesh(){
	/* メンバ変数 */	
	this.m_meshNum			= null;								//地図メッシュ番号
	this.m_rect				= null;								//存在領域矩形
	this.m_dataType			= DATA_TYPE.DATA_TYPE_INVALID;		//データ種別
	this.m_elementInfoArr	= null;								//描画情報配列 
	this.m_drawModel		= null;								//描画モデル
};

/* 単純なセッタ・ゲッタ */
//描画情報配列の設定
MapMesh.prototype.setElementInfoArr = function(infoArr){
	this.m_elementInfoArr = infoArr;
};
//描画情報配列の取得
MapMesh.prototype.getElementInfoArr = function(){
	return this.m_elementInfoArr;
};

//データ種別の設定
MapMesh.prototype.setDataType = function(dataType){
	this.m_dataType = dataType;
};
//データ種別の取得
MapMesh.prototype.getDataType = function(){
	return this.m_dataType;
};

//描画モデルの設定
MapMesh.prototype.setDrawModel = function(drawModel){
	this.m_drawModel = drawModel;
};
//描画モデルの取得
MapMesh.prototype.getDrawModel = function(){
	return this.m_drawModel;
};

/**
 * createElementInfoArr.
 * 描画情報配列の作成
 * @param
 * @return
 */	
MapMesh.prototype.createElementInfoArr = function(){
	if(this.m_dataType == DATA_TYPE.DATA_TYPE_INVALID){
		return;
	}
	
	var result = ERROR_CODE.ERROR_CODE_INVALID;
	//データ種別ごとに描画情報を作成
	switch(this.m_dataType){
		//フルベクトルデータの作成
		case DATA_TYPE.DATA_TYPE_FULLVECTOR : {
			result = this.createFullvectorElementInfoArr();
			break;
		}
		//注記データの作成
		case DATA_TYPE.DATA_TYPE_TEXT : {
			result = this.createTextElementInfoArr();
			break;
		}
		default : {
			break;
		}
	}
	
	return result;
};

/**
 * createFullvectorElementInfoArr.
 * フルベクトル描画情報配列の作成
 * @param
 * @return
 */	
MapMesh.prototype.createFullvectorElementInfoArr = function(){
	
	//データ取得
	
	//データパース
	
	var shapeCount = 1;
	
	this.m_elementInfoArr = new Array();
	
	//形状数分ループ
	for(var i=0;i<shapeCount;i++){
		var onePolElement = new PolygonElementInfo();
		onePolElement.setColor(0xe6e6e6);
		onePolElement.setshapeType(SHAPE_TYPE.SHAPE_TYPE_POLYGON);
		var polOffsetArr	= [ [360,30,0], [-360,30,0], [-360,-30,0], [360,-30,0] ];
		onePolElement.setOffsetArr(polOffsetArr);
		var polTriangleArr	= [ [0,1,2],[0,2,3] ];
		onePolElement.setTriangleArr(polTriangleArr);
		this.m_elementInfoArr.push(onePolElement);
	}
	
	return ERROR_CODE.ERROR_CODE_SUCCESS;
};

/**
 * createTextElementInfoArr.
 * テキスト形状描画情報配列の作成
 * @param
 * @return
 */	
MapMesh.prototype.createTextElementInfoArr = function(){	
	return ERROR_CODE.ERROR_CODE_SUCCESS;
};

/**
 * createFullvectorDrawElement.
 * テキスト形状描画情報配列の作成
 * @param
 * @return
 */	
MapMesh.prototype.createFullvectorDrawElement = function(){
	var result = ERROR_CODE.ERROR_CODE_INVALID;
	
	if(this.m_elementInfoArr == null){ return result; }
	var shapeCount = this.m_elementInfoArr.length;	
	if(shapeCount == 0){ return result; }
	
	//ジオメトリの作成
	var geometry = new THREE.Geometry();
	
	for(var i=0;i<shapeCount;i++){
		var oneShape = this.m_elementInfoArr[i];
		var shapeType = oneShape.getShapeType();
		switch(shapeType){
			case SHAPE_TYPE.SHAPE_TYPE_POLYLINE :{//線形状
				result = oneShape.createElement(geometry);//描画モデルに頂点を追加
				break;
			}
			case SHAPE_TYPE.SHAPE_TYPE_POLYGON :{//面形状
				result = oneShape.createElement(geometry);//描画モデルに頂点を追加				
				break;
			}
			default:{
				break;
			}
		}
		
		if(result != ERROR_CODE.ERROR_CODE_SUCCESS){
			return result;
		}
	}
	
	// 法線ベクトルの自動計算
	geometry.computeFaceNormals();
	geometry.computeVertexNormals();
	// マテリアルの作成
	var material = new THREE.MeshBasicMaterial({ vertexColors: THREE.VertexColors });
	//Three.Meshの作成
	var mesh = new THREE.Mesh( geometry, material );
	
	var model = new DrawModelBase();
	model.setDrawElement(mesh);
	this.m_drawModel = model;
	
	return ERROR_CODE.ERROR_CODE_SUCCESS;
};

/**
 * createDrawElementArr.
 * 描画モデルの作成
 * @param
 * @return
 */	
MapMesh.prototype.createDrawElementArr = function(){
	if(this.m_dataType == DATA_TYPE.DATA_TYPE_INVALID){
		return;
	}
	
	var result = ERROR_CODE.ERROR_CODE_INVALID;
	//データ種別ごとに描画情報を作成
	switch(this.m_dataType){
		//フルベクトルデータの作成
		case DATA_TYPE.DATA_TYPE_FULLVECTOR : {
			result = this.createFullvectorDrawElement();
			break;
		}
		//注記データの作成
		case DATA_TYPE.DATA_TYPE_TEXT : {
			//result = createTextElementInfoArr();
			break;
		}
		default : {
			break;
		}
	}
	
	return result;
};