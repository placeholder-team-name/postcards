import { db } from "../../firebase";

async function hasUniqueEmail(user, recipientEmail) {
    let snapshot;

    try {
        snapshot = await db.ref(`recipients/${user.uid}`).once("value");
    } catch {
        return false;
    }

    if (snapshot) {
        let isUnique = true;
        snapshot.forEach(function(childSnapshot) {
            const recipient = childSnapshot.val();
            if (recipient.email === recipientEmail) {
                isUnique = false;
            }
        });

        return isUnique;
    }

    return false;
}

export default hasUniqueEmail;
