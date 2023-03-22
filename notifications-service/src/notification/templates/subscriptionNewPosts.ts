export const subscriptionEmailNewPost = (jobs) => {
  return `
<table border="0" width="100%" cellspacing="0" cellpadding="0" bgcolor="#EEEEEE">
<tbody>
<tr>
<td bgcolor="#EEEEEE" width="4">${JSON.stringify(jobs)}</td>
</tr>
<tr>
<td style="font-size: 4px;" bgcolor="#EEEEEE" height="4">&nbsp;</td>
<td style="font-size: 4px;" bgcolor="#EEEEEE">&nbsp;</td>
<td style="font-size: 4px;" bgcolor="#EEEEEE">&nbsp;</td>
</tr>
<tr>
<td height="20">&nbsp;</td>
</tr>
<tr>
<td>
</td>
</tr>
<tr>
<td height="30">&nbsp;</td>
</tr>
</tbody>
</table>
`;
};
