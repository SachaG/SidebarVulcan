import React from 'react';
import { formatMoney } from '../../modules/helpers';

const PostInvoice = ({ post }) => {
  const { title, scheduledAtFormatted, paidAtFormatted, sponsorshipPrice, user } = post;

  return (
    <div className="post-invoice">
      <h2>Sidebar Weekly Sponsorship</h2>
      <h4>For the week of {scheduledAtFormatted}</h4>
      <table className="table">
        <tbody>
          <tr>
            <th>Link</th>
            <td>{title}</td>
          </tr>
          <tr>
            <th>Paid By</th>
            <td>{user.displayName}</td>
          </tr>
          <tr>
            <th>Paid To</th>
            <td>Sacha Greif, Sidebar</td>
          </tr>
          <tr>
            <th>Paid On</th>
            <td>{paidAtFormatted}</td>
          </tr>
          {/* <tr>
            <th>Scheduled For</th>
            <td>{scheduledAtFormatted}</td>
          </tr> */}
          <tr>
            <th>Amount</th>
            <td>{formatMoney(sponsorshipPrice / 100)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PostInvoice;
