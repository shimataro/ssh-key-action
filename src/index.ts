import * as core from "@actions/core";

import * as common from "./common";
import {main} from "./main";
import {post} from "./post";

try {
    switch (common.getPhase()) {
        case "main":
            main();
            break;

        case "post":
            post();
            break;
    }
} catch (err) {
    if (err instanceof Error) {
        core.setFailed(err);
    }
}
