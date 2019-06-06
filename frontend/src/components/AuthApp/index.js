import React, { useEffect } from "react";

import WriteAndPreviewComponent from "..//WriteAndPreviewComponent";
import MainRouter from "../MainRouter";
import SettingsPage from "../../pages/SettingsPage";
import RecipientsPage from "../../pages/RecipientsPage";
import RecipientsNewPage from "../../pages/RecipientsNewPage";
import RecipientsDetailPage from "../../pages/RecipientsDetailPage";

import usePush from "../../hooks/usePush";

function AuthApp({ user }) {
    const {
        isPushEnabled,
        enablePush,
        disablePush,
        isAllowedByBrowser
    } = usePush(user);

    useEffect(() => {
        enablePush(false);
    }, []);

    return (
        <MainRouter>
            <WriteAndPreviewComponent path="/*" user={user} />
            <SettingsPage
                path="/settings"
                user={user}
                isPushEnabled={isPushEnabled}
                enablePush={enablePush}
                disablePush={disablePush}
                isAllowedByBrowser={isAllowedByBrowser}
            />
            <RecipientsPage path="/recipients" user={user} />
            <RecipientsNewPage path="/recipients/new" user={user} />
            <RecipientsDetailPage path="/recipients/:recipientID" user={user} />
        </MainRouter>
    );
}

export default AuthApp;
