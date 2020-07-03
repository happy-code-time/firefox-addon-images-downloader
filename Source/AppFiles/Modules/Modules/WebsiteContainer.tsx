import * as React from 'react';

import getDerivedStateFromPropsCheck from '../../Functions/getDerivedStateFromPropsCheck';

class WebsiteContainer extends React.Component {

  public props: {
    [key: string]: any
  };

  public state: {
    [key: string]: any
  };

  public nodeSideBar: Node;

  constructor(props) {
    super(props);
    this.getClassNamesContent = this.getClassNamesContent.bind(this);
    this.getClassNamesSidebar = this.getClassNamesSidebar.bind(this);
    this.sideBar = this.sideBar.bind(this);
    this.resizeView = this.resizeView.bind(this);

    this.state = {
      moduleSidebar: (props.moduleSidebar && typeof {} == typeof props.moduleSidebar) ? props.moduleSidebar : undefined,
      headerData: (props.headerData && typeof {} == typeof props.headerData) ? props.headerData : undefined,
      contentData: (props.contentData && typeof {} == typeof props.contentData) ? props.contentData : undefined,
      persistUserSelection: (typeof true == typeof props.persistUserSelection) ? props.persistUserSelection: undefined,
      clearPersistUserSelection: (typeof true == typeof props.clearPersistUserSelection) ? props.clearPersistUserSelection: undefined,
      sidebarMinifiedAt: (typeof 8 == typeof props.sidebarMinifiedAt) ? props.sidebarMinifiedAt: 720,
      sidebarMaxifiedAt: (typeof 8 == typeof props.sidebarMaxifiedAt) ? props.sidebarMaxifiedAt: 1024,
      displayMinifyMaxifyIcon: (typeof true == typeof props.displayMinifyMaxifyIcon) ? props.displayMinifyMaxifyIcon: undefined,
      minifiedSecondSideBar: true
    };
  }

  /**
   * Force re-rendering of this component based
   * on keysChangeListners keys
   * @param {object} props 
   * @param {object} state 
   */
  static getDerivedStateFromProps(props, state) {
    if (getDerivedStateFromPropsCheck(['moduleSidebar', 'headerData', 'contentData', 'persistUserSelection', 'sidebarMinifiedAt', 'sidebarMaxifiedAt', 'displayMinifyMaxifyIcon'], props, state)) {
      return {
        moduleSidebar: (props.moduleSidebar && typeof {} == typeof props.moduleSidebar) ? props.moduleSidebar : undefined,
        headerData: (props.headerData && typeof {} == typeof props.headerData) ? props.headerData : undefined,
        contentData: (props.contentData && typeof {} == typeof props.contentData) ? props.contentData : undefined,
        persistUserSelection: (typeof true == typeof props.persistUserSelection) ? props.persistUserSelection: undefined,
        clearPersistUserSelection: (typeof true == typeof props.clearPersistUserSelection) ? props.clearPersistUserSelection: undefined,
        sidebarMinifiedAt: (typeof 8 == typeof props.sidebarMinifiedAt) ? props.sidebarMinifiedAt: 720,
        sidebarMaxifiedAt: (typeof 8 == typeof props.sidebarMaxifiedAt) ? props.sidebarMaxifiedAt: 1024,
        displayMinifyMaxifyIcon: (typeof true == typeof props.displayMinifyMaxifyIcon) ? props.displayMinifyMaxifyIcon: undefined,
      };
    }

    return null;
  }

  componentDidMount() {
    const { clearPersistUserSelection } = this.state;

    if(clearPersistUserSelection || undefined === clearPersistUserSelection){
      localStorage.removeItem('persistUserSelection');
    }

    window.addEventListener('resize', this.resizeView);
    this.resizeView();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeView);
  }

  resizeView() {
    const { persistUserSelection, sidebarMinifiedAt, sidebarMaxifiedAt } = this.state;

    if(persistUserSelection && null !== localStorage.getItem('persistUserSelection')){
      try{
        const userSet = JSON.parse(localStorage.getItem('persistUserSelection'));
        const { sidebarMin, contentMin, isMinified, minifiedSecondSideBar } = userSet;
        return this.setState({ sidebarMin, contentMin, isMinified, minifiedSecondSideBar });
      }
      catch(e){
        //
      }
    }

    const documentWidth = document.documentElement.getBoundingClientRect().width;

    /**
     * Bigger then XXXXXX
     */
    if (documentWidth >= sidebarMaxifiedAt) {
      return this.setState({
        sidebarMin: false,
        contentMin: false,
        isMinified: false,
        minifiedSecondSideBar: true
      });
    }

    /**
     * Lower then XXXX
     */
    if (documentWidth <= sidebarMinifiedAt) {
      return this.setState({
        sidebarMin: true,
        contentMin: true,
        isMinified: true,
      });
    }

    /**
     * Lower then XXXXX
     */
    if (documentWidth < sidebarMaxifiedAt) {
      return this.setState({
        sidebarMin: true,
        contentMin: true,
        isMinified: false, // show the minified icons set
        minifiedSecondSideBar: true
      });
    }

    return null;
  }

  /**
   * Get class names for the main sidebar
   */
  getClassNamesSidebar() {
    const { sidebarMin, contentMin } = this.state;

    if (contentMin || sidebarMin) {
      return 'SideBar SideBar-min';
    }
    return 'SideBar';
  }

  /**
   * Get class names for the content
   */
  getClassNamesContent() {
    const { contentMin, sidebarMin } = this.state;

    /**
     * For screens smaller then 720px
     * toggle the class name 'opened'
     */
    if (this.state.isMinified) {
      const { minifiedSecondSideBar } = this.state;

      if (minifiedSecondSideBar) {
        return 'Content minified';
      }
      return 'Content minified opened';
    }
    /**
     * Default content functionality if
     * screen is bigger then 720px
     */

    if (contentMin || sidebarMin) {
      return 'Content Content-min';
    }
    return 'Content';
  }

  /**
   * Toggle the main sidebar
   * if the user clicks the menu icon
   */
  sideBar() {
    const { isMinified } = this.state;

    /**
     * Toggle the second sidebar on the x-axis (css property: left)
     */
    if (isMinified) {
      this.setState({
        minifiedSecondSideBar: !this.state.minifiedSecondSideBar,
      }, () => {
        const { sidebarMin, contentMin, isMinified, minifiedSecondSideBar, persistUserSelection } = this.state;

        if(persistUserSelection){
          localStorage.setItem('persistUserSelection', JSON.stringify({ sidebarMin, contentMin, isMinified, minifiedSecondSideBar }));
        }
      });
    } else {
      this.setState({
        sidebarMin: !this.state.sidebarMin,
        contentMin: !this.state.contentMin,
      }, () => {
        const { sidebarMin, contentMin, isMinified, minifiedSecondSideBar, persistUserSelection } = this.state;

        if(persistUserSelection){
          localStorage.setItem('persistUserSelection', JSON.stringify({ sidebarMin, contentMin, isMinified, minifiedSecondSideBar }));
        }
      });
    }
  }

  render() {
    const { moduleSidebar, headerData, contentData, displayMinifyMaxifyIcon } = this.state;
    const sidebarClassNames: string = this.getClassNamesSidebar();
    const contentClassNames: string = this.getClassNamesContent();

    return (
      <div className="Main block">
        <div
          ref={node => (this.nodeSideBar = node)}
          className={`${this.state.isMinified ? (this.state.minifiedSecondSideBar ? 'SideBar SidebarMinified' : 'SideBar SidebarMinified opened') : sidebarClassNames}`}
        >

          {
            this.state.isMinified &&
            <i className="fas fa-angle-left close-side-bar action-icon" onClick={e => this.sideBar()} />
          }
          {
            moduleSidebar && moduleSidebar
          }
        </div>
        <div className={contentClassNames}>
          <div className="head">
            {
              displayMinifyMaxifyIcon && 
              <i onClick={e => this.sideBar()} className="fas fa-bars minify-menu" />
            }
            {
              headerData && headerData
            }
          </div>
          {
            contentData && contentData
          }
        </div>
      </div>
    );
  }
}

export default WebsiteContainer;
