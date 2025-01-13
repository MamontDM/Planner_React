import React, { useState } from "react";

const ComponentList = ({components}) => {

    const [open, setIsOpen] = useState({});
    const toogleOpen = (id) => {
        setIsOpen((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const renderList = (items) => {
        return (
            <div className="components-wrapper">
                {items.map((item) => (
                    <ListItem 
                        key={item.id} 
                        item={item}
                        isOpen={open[item.id] || false}
                        toggleOpen={() => toogleOpen(item.id)}
                    />
                ))}
            </div>
        );
    };
   return <div>{renderList(components)}</div>
};


const ListItem = ({item, isOpen, toggleOpen}) => {

    const hasChildren = React.isValidElement(item.children);
    return (
        <div className="component-list">
                <button
                    className={`list-button ${isOpen ? "active" : ''}`}
                    onClick={toggleOpen}
                    style={{cursor: 'pointer'}}
                    >
                        {item.name}
                </button>

                {isOpen && (
                    <>
                    {React.isValidElement(item.children)? (
                        item.children 
                    ) : ( 
                        null
                    )}
                  </>
                )}
        </div>
    );
};

export default ComponentList;