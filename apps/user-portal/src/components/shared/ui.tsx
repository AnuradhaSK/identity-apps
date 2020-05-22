/**
 * Copyright (c) 2019, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
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

import classNames from "classnames";
import * as React from "react";
import { Image } from "semantic-ui-react";
import { HomeTileIconImages, UserImage } from "../../configs";

interface ImageProps {
    classes?: any;
    size?: any;
    style?: any;
    floated?: "left" | "right";
}

type HomeTileIconImagePropInputs = "Profile" | "Security" | "Consent";

interface HomeTileIconImageProps extends ImageProps {
    icon: HomeTileIconImagePropInputs;
}

export const UserImagePlaceHolder = (props: ImageProps) => {
    const { classes, size, floated } = props;

    return (
        <Image
            className={ classNames(classes, "user-image") }
            src={ UserImage }
            size={ size }
            floated={ floated }
            circular
            centered
        />
    );
};

export const HomeTileIcon = (props: HomeTileIconImageProps) => {
    const { classes, size, icon } = props;

    const src = () => {
        switch (icon) {
            case "Profile": {
                return HomeTileIconImages.profile;
            }
            case "Security": {
                return HomeTileIconImages.security;
            }
            case "Consent": {
                return HomeTileIconImages.consent;
            }
            default:
                return "";
        }
    };

    return (
        <Image
            className={ classNames(classes, "home-tile-icon") }
            src={ src() }
            size={ size }
            centered
        />
    );
};
