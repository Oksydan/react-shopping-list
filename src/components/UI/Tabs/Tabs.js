import React, { Component } from 'react';


class Tabs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedIndex: props.selectedIndex,
            tabs: []
        }
    }


    componentDidMount() {
        const tabs = this.props.children.map((el, i) => {
            return {
                id: 'tab_' + i,
                title: el.props.title,
                selected: this.state.selectedIndex === i,
                index: i
            }
        });

        this.setState({ tabs });
    }

    handleSelect(e, index) {
        e.preventDefault();
        
        this.setState(state => {
            state.tabs = state.tabs.map((el, i) => {
                console.log(i, index === i)
                return {
                    ...el,
                    selected: index === i
                }
            });
            state.selectedIndex = index;
            return state;
        });
    }

    render() {
        const navLinks = this.state.tabs.map((el, i) => {
            return (
                <li className="tabs__navElem" key={el.id}>
                    <a 
                        href={`#${el.id}`}
                        key={el.id}
                        className={el.selected ? 
                            "tabs__navLink tabs__navLink--selected"
                            :
                            "tabs__navLink"
                        }
                        onClick={(e) => this.handleSelect(e, i)}
                        title={el.title}
                        >
                            {el.title}
                    </a>
                </li>
            )
        });


        let tabPanels = null;

        if(this.state.tabs.length > 0) {
            tabPanels = React.Children.map(this.props.children, (child, i) => {
                return React.cloneElement(child, {
                    selected: this.state.tabs[i].selected,
                    key: i
                });
            });
        }
      


        return (
            <div className="tabs">
                <ul className="tabs__nav">
                    {navLinks}
                </ul>
                <div className="tabs__content">
                    {tabPanels}
                </div>
            </div>
        );
    }
}


export default Tabs;