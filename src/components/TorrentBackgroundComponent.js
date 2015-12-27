import React from 'react';

// import ChartistGraph from 'react-chartist';
import style from 'styles//TorrentBackground.scss';


const rateData = {
    download: [12, 12.3, 12.34, 12.4, 12, 10, 6, 2, 8, 10, 12, 8, 8.1, 9, 11, 10, 10.2, 11, 10.4,
     12.5, 13, 11, 12, 7, 5, 10, 11.1, 8.2, 8.9, 10.2, 9, 8, 8.1, 9, 11, 10, 10.6, 10.8, 6, 12.5,
      13, 14, 13, 5, 1, 7, 12, 12.5, 13, 13, 13.5, 13, 12.5, 12, 4, 8, 10, 6, 8, 8.1, 9, 11, 10, 10, 10, 10,
     12.5, 13, 11, 12, 7, 5, 10, 11, 8.9, 8, 10, 9, 8, 8.1, 9, 11, 9, 10.1, 12, 13, 12.5,
      13, 14, 12, 13.6, 13.8, 12.3, 11.1],
    upload: [3, 2, 9, 5, 4, 6, 4, 6, 7, 8, 7, 6, 6, 4, 6, 7, 8, 7, 4, 6, 7, 8, 7, 6,
     6, 4,  2, 9, 5, 4, 6, 4, 6, 7, 8, 7, 6, 7, 8, 7, 6, 6, 4, 6, 7, 8, 7, 4, 6, 7, 8, 7, 6,
     6, 4, 6, 4, 6, 7, 8, 7]
};

class TorrentBackground extends React.Component {

	render () {

		//let downCols = this.processData(rateData.download, "#00acc1");
		// let upCols = this.processData(rateData.upload);
		let max = Math.max.apply(Math, rateData.download);
		let i = 0;
		return (

 	 		<div className={style.topContainer}>
 	 			{rateData.download.map(function(value) {
					return (<div key={i++} className={style.chartColumn} style={{
											backgroundColor: '#00acc1',
											height: (value / max) * 80 + '%'
										}}> </div>)
 	 			})}
 	 		</div>
		)
	}
}
export default TorrentBackground;