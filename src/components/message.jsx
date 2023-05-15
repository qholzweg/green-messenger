import { Icon } from '@iconify/react';

const Status = ({_status}) => {
  if (_status === 'inProgress') return (
    <Icon icon="material-symbols:nest-clock-farsight-analog-outline-rounded"  style={{ display: 'inline' }}  width="20" />
  )
  if (_status === 'sent') {return (
    <Icon icon="material-symbols:check-small" style={{ display: 'inline' }}  width="24" />
  )}
  if (_status === 'delivered') return (
    <>
    <Icon icon="material-symbols:check-small" style={{ display: 'inline' }}  width="24" />
    <Icon icon="material-symbols:check-small" style={{ display: 'inline', marginLeft: '-19px' }}  width="24" />
    </>
  )

  if (_status === 'read') return (
    <>
    <Icon icon="material-symbols:check-small" color="#a1ef86"  style={{ display: 'inline' }}  width="24" />
    <Icon icon="material-symbols:check-small" color="#a1ef86"  style={{ display: 'inline', marginLeft: '-19px' }}  width="24" />
    </>
  )
}

export const Message = ({ message }) => {
  const date = new Date(message.timestamp);
  const dateText = `${date.getHours()}:${date.getMinutes()<10?'0':''}${date.getMinutes()}`
  let text = '', quoted = '';
  if (message.messageData?.typeMessage === 'quotedMessage') {
    text = message?.messageData?.extendedTextMessageData?.text;
    quoted = message?.messageData?.quotedMessage?.textMessage;
  } else if (message.messageData?.typeMessage === 'textMessage') {
    text = message.messageData?.textMessageData?.textMessage;
    quoted = '';
  }
  return (
    <div className={`message bg-slate-100 border border-slate-200 rounded-lg ${message?.outgoing ? 'self-end' : ''}`}>
      {quoted !== '' &&
        <div className="quoted rounded-t-lg bg-slate-200 py-2 px-4 text-gray-500">{quoted}</div>
      }
      <div className="text pt-2 px-4">{text}</div>
      <div className="meta text-right">
        <span className="text-gray-400 px-4 text-sm">{dateText} <Status _status={message._status} /></span>
      </div>
    </div>
  )
}