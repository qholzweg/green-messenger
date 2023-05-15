export class Api {
  BASE_URL = "https://api.green-api.com";

  constructor(id, token, chatId) {
    this.id = id;
    this.token = token;
    this.chatId = chatId;
  }

  //sending message, returning message id
  async send(text) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "chatId": `${this.chatId}@c.us`,
      "message": text
    });

    const url = `${this.BASE_URL}/waInstance${this.id}/sendMessage/${this.token}`;

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    return await fetch(url, requestOptions)
      .then(res => res.ok ? res.json() : Promise.reject(false))
      .then(result => {
        if (result?.idMessage) return result?.idMessage;
      })
      .catch(error => {
        console.log('error', error);
        return Promise.reject(false);
      });
  }


  // recieves notification, if it exists runs callbacks dependig on type & delete notification
  recieveLoop(onIncoming, onStatusUpdate, onFinish) {
    this.recieve().then((data) => {
      if (!data) {
        if (typeof onFinish === 'function') { onFinish() }
        return;
      }
      //if it's incoming
      if (data?.body?.typeWebhook === 'incomingMessageReceived' && data?.body?.senderData?.chatId === `${this.chatId}@c.us` && typeof onIncoming === 'function') onIncoming({
        idMessage: data?.body?.idMessage,
        timestamp: data?.body?.timestamp,
        messageData: data?.body?.messageData
      });
      // if it's status changes
      if (data?.body?.typeWebhook === 'outgoingMessageStatus' && typeof onStatusUpdate === 'function') onStatusUpdate(data?.body?.idMessage, data?.body?.status);
      
      this.delete(data?.receiptId)
        .then((res) => {
          //if there are other notifications in queue
          if (res) this.recieveLoop(onIncoming, onStatusUpdate)
        })
        .catch(error => console.log('error', error));
    }
    )
      .catch(error => {
        console.log('error', error);
        return Promise.reject(false);
      });
  }

  async recieve() {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    const url = `${this.BASE_URL}/waInstance${this.id}/receiveNotification/${this.token}`;

    return await fetch(url, requestOptions)
      .then(res => res.ok ? res.json() : Promise.reject(false))
      .then(data => {
        return data;
      })
      .catch(error => console.log('error', error));
  }

  async delete(receiptId) {
    const requestOptions = {
      method: 'DELETE',
      redirect: 'follow'
    };

    const url = `${this.BASE_URL}/waInstance${this.id}/deleteNotification/${this.token}/${receiptId}`;

    return await fetch(url, requestOptions)
      .then(res => res.ok ? res.json() : Promise.reject(false))
      .then(result => {
        return result?.result;
      })
      .catch(error => {
        console.log('error', error);
        return Promise.reject(false);
      });
  }
}