/**
 * Util.
 * ユーティリティクラス
 * @param 
 * @return
 */

/* エラーコード */
const ERROR_CODE_SUCCESS				=  0;
const ERROR_CODE_FAILURE				=  1;
const ERROR_CODE_FAILD_CREEATE_INSTANCE	= -1;


/**
 * getWindowSize.
 * ブラウザのウィンドウサイズを返却
 * @param 
 * @return
 */
function getWindowSize(){
	var result = [0,0];
	result[0] = window.innerWidth;
	result[1] = window.innerHeight;	
}