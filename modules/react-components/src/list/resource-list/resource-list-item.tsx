/**
 * Copyright (c) 2020, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import {
    Dropdown,
    DropdownItemProps,
    Grid,
    Icon,
    List,
    ListItemProps,
    Popup,
    SemanticFLOATS,
    SemanticICONS,
    SemanticWIDTHS,
    StrictGridRowProps
} from "semantic-ui-react";
import React, { FunctionComponent, ReactNode } from "react";
import classNames from "classnames";

/**
 * Proptypes for the resource list item component.
 */
export interface ResourceListItemPropsInterface extends ListItemProps {
    /**
     * List items actions.
     */
    actions?: ResourceListActionInterface[];
    /**
     * Action panel float direction.
     */
    actionsFloated?: SemanticFLOATS;
    /**
     * Width of the action panel column.
     */
    actionsColumnWidth?: SemanticWIDTHS;
    /**
     * Avatar to be displayed on the list item.
     * Can be either {@link UserAvatar} or {@link AppAvatar}
     */
    avatar?: ReactNode;
    /**
     * Additional CSS classes.
     */
    className?: string;
    /**
     * List item header.
     */
    itemHeader: string | ReactNode;
    /**
     * List item description
     */
    itemDescription?: string | ReactNode;
    /**
     * Width of the description area.
     */
    descriptionColumnWidth?: SemanticWIDTHS;
    /**
     * Meta info about the list item.
     */
    metaContent?: ReactNode | ReactNode[];
    /**
     * Width of the meta info area.
     */
    metaColumnWidth?: SemanticWIDTHS;
}

/**
 * Resource list action interface.
 */
export interface ResourceListActionInterface {
    disabled?: boolean;
    hidden?: boolean;
    icon: SemanticICONS;
    onClick?: () => void;
    popupText?: string;
    subActions?: DropdownItemProps[];
    type: "button" | "dropdown";
}

/**
 * Resource list item component.
 *
 * @param {ResourceListItemPropsInterface} props - Props injected to the component.
 * @return {JSX.Element}
 */
export const ResourceListItem: FunctionComponent<ResourceListItemPropsInterface> = (
    props: ResourceListItemPropsInterface
): JSX.Element => {

    const {
        actions,
        actionsColumnWidth,
        actionsFloated,
        avatar,
        className,
        descriptionColumnWidth,
        itemDescription,
        itemHeader,
        metaContent,
        metaColumnWidth
    } = props;

    const classes = classNames("resource-list-item", className);

    return (
        <List.Item className={ classes }>
            <Grid>
                <Grid.Row columns={
                    metaContent instanceof Array
                        ? (metaContent.length + 2) as StrictGridRowProps[ "columns" ]
                        : (itemHeader || itemDescription)
                            ? 3
                            : 2
                }>
                    { (itemDescription || itemHeader)
                        ? (
                            <Grid.Column width={ descriptionColumnWidth } className="resource-item-column">
                                { avatar }
                                <List.Content>
                                    <List.Header className="list-item-name">{ itemHeader }</List.Header>
                                    { itemDescription &&
                                        <List.Description className="list-item-description">
                                            { itemDescription }
                                        </List.Description>
                                    }
                                </List.Content>
                            </Grid.Column>
                        )
                        : null
                    }
                    {
                        metaContent instanceof Array
                            ? (
                                metaContent?.map((content, index) => {
                                    return (
                                        <Grid.Column key={ index } width={ metaColumnWidth } verticalAlign="middle">
                                            <List.Content>{ content }</List.Content>
                                        </Grid.Column>
                                    )
                                })
                            )
                            : (
                                <Grid.Column width={ metaColumnWidth } verticalAlign="middle">
                                    <List.Content>{ metaContent }</List.Content>
                                </Grid.Column>
                            )
                    }
                    <Grid.Column width={ actionsColumnWidth }>
                        <List.Content floated={ actionsFloated } className="list-item-action-panel">
                            {
                                (actions && actions.length && actions.length > 0)
                                    ? actions.map((action, index) => (
                                        !action.hidden && (
                                            <div className="list-item-action" key={ index }>
                                                {
                                                    action.type === "dropdown"
                                                        ? (
                                                            <Dropdown
                                                                direction="left"
                                                                icon={ null }
                                                                trigger={ (
                                                                    <Popup
                                                                        disabled={ action.disabled }
                                                                        trigger={ (
                                                                            <Icon
                                                                                link
                                                                                className="list-icon"
                                                                                disabled={ action.disabled }
                                                                                size="small"
                                                                                color="grey"
                                                                                name={ action.icon }
                                                                                onClick={ action.onClick }
                                                                            />
                                                                        ) }
                                                                        position="top center"
                                                                        content={ action.popupText }
                                                                        inverted
                                                                    />
                                                                ) }
                                                                options={ action.subActions }
                                                            />
                                                        ) :
                                                        (
                                                            <Popup
                                                                disabled={ action.disabled }
                                                                trigger={ (
                                                                    <Icon
                                                                        link
                                                                        className="list-icon"
                                                                        disabled={ action.disabled }
                                                                        size="small"
                                                                        color="grey"
                                                                        name={ action.icon }
                                                                        onClick={ action.onClick }
                                                                    />
                                                                ) }
                                                                position="top center"
                                                                content={ action.popupText }
                                                                inverted
                                                            />
                                                        )
                                                }
                                            </div>
                                        )
                                    ))
                                    : null
                            }
                        </List.Content>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </List.Item>
    );
};

/**
 * Default proptypes for the resource list item component.
 */
ResourceListItem.defaultProps = {
    actionsColumnWidth: 5,
    actionsFloated: "left",
    descriptionColumnWidth: 7,
    metaColumnWidth: 4
};
