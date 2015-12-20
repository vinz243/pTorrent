
import React from 'react';
import style from 'styles//TitleBar.scss';
import {Paper, FontIcon} from 'material-ui/lib';


import DefaultRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import ThemeManager from 'material-ui/lib/styles/theme-manager';

const TitleBar = React.createClass({

	contextTypes: {
	  muiTheme: React.PropTypes.object,
	},
	//for passing default theme context to children
	childContextTypes: {
	  muiTheme: React.PropTypes.object,
	},
	getChildContext() {
	  return {
	    muiTheme: this.state.muiTheme,
	  };
	},
	getInitialState() {
  	  return {
  	    muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
  	  };
  	},

	render () {

	    const muiTheme = this.state.muiTheme;
	    const rawTheme = muiTheme.rawTheme;
	
	    let themeVariables = muiTheme.appBar;

		return (
			<div style={{
				backgroundColor: themeVariables.color
			}} className={style.titleBar}>
				<Paper zDepth={2} style={{
					backgroundColor: 'rgba(0,0,0,0)',
					width: '100%',
					borderRadius: '0px'
				}}>
					<div className={style.titleContainer}>
						<span className={style.title}>
							ρTorrent
						</span>
						<span className={style.searchBar}>
							<span className={style.searchIcon}>
								<FontIcon className="material-icons" color="#fff">search</FontIcon>
							</span>
							<span className={style.searchInput}>
								<input type="text" placeholder="Search" />
							</span>
						</span>
						<span className={style.titleBarActions} >
							<span className={style.minimize}>
								<FontIcon className="material-icons" color="#fff">vertical_align_bottom</FontIcon>
							</span>
							<span className={style.maximise}>
								<FontIcon className="material-icons" color="#fff">fullscreen</FontIcon>
							</span>
							<span className={style.close}>
								<FontIcon className="material-icons" color="#fff">close</FontIcon>
							</span>
						</span>

					</div>

				</Paper>
			</div>
		)
	}
});

export default TitleBar;