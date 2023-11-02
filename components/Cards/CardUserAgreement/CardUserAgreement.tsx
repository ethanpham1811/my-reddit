import { RdButton, RdCard } from '@/components'
import { Divider, List, ListItem, Stack, Typography } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'

function CardUserAgreement({ setOpen }: { setOpen: Dispatch<SetStateAction<boolean>> }) {
  return (
    <RdCard sx={{ p: 4, display: 'flex' }}>
      <Stack spacing={2} flex={1}>
        <Stack spacing={2}>
          <Typography variant="h4">User Agreement</Typography>
        </Stack>
        <Divider sx={{ my: 1 }} />
        <Stack flex={1} spacing={2} sx={{ overflowY: 'scroll', overflowX: 'hidden', mr: '-10px !important', pr: '10px' }}>
          <Typography variant="h5">1. Your Access to the Services</Typography>
          <Typography variant="body1">
            No one under 13 is allowed to use or access the Services. We may offer additional Services that require you to be older to use them, so
            please read all notices and any Additional Terms carefully when you access the Services.
          </Typography>
          <Typography variant="body1">By using the Services, you state that:</Typography>
          <List sx={{ listStyle: 'disc' }}>
            <ListItem sx={{ display: 'list-item', ml: '20px', pl: 0 }}>
              <Typography variant="body1">
                You are at least 13 years old and over the minimum age required by the laws of your country of residence to access and use the
                Services;
              </Typography>
            </ListItem>
            <ListItem sx={{ display: 'list-item', ml: '20px', pl: 0 }}>
              <Typography variant="body1">
                You can form a binding contract with Reddit, or, if you are over 13 but under the age of majority in your jurisdiction, that your
                legal guardian has reviewed and agrees to these Terms;
              </Typography>
            </ListItem>
            <ListItem sx={{ display: 'list-item', ml: '20px', pl: 0 }}>
              <Typography variant="body1">-You are not barred from using the Services under all applicable laws; and</Typography>
            </ListItem>
            <ListItem sx={{ display: 'list-item', ml: '20px', pl: 0 }}>
              <Typography variant="body1">
                You have not been permanently suspended or removed from the Services. If you are accepting these Terms on behalf of another legal
                entity, including a business or government entity, you represent that you have full legal authority to bind such entity to these
                Terms.
              </Typography>
            </ListItem>
          </List>
          <Typography variant="h5">2. Privacy</Typography>
          <Typography variant="body1">
            Reddit’s Privacy Policy explains how and why we collect, use, and share information about you when you access or use our Services. You
            understand that through your use of the Services, you consent to the collection and use of this information as set forth in the Privacy
            Policy.
          </Typography>
          <Typography variant="h5">3. Your Use of the Services</Typography>
          <Typography variant="body1">
            Subject to your complete and ongoing compliance with these Terms, Reddit grants you a personal, non-transferable, non-exclusive,
            revocable, limited license to: (a) install and use a copy of our mobile application associated with the Services that is obtained from a
            legitimate marketplace on a mobile device owned or controlled by you; and (b) access and use the Services. We reserve all rights not
            expressly granted to you by these Terms.
          </Typography>
          <Typography variant="body1">
            Except and solely to the extent such a restriction is impermissible under applicable law, you may not, without our written agreement:
          </Typography>
          <List sx={{ listStyle: 'disc' }}>
            <ListItem sx={{ display: 'list-item', ml: '20px', pl: 0 }}>
              <Typography variant="body1">
                license, sell, transfer, assign, distribute, host, or otherwise commercially exploit the Services or Content;
              </Typography>
            </ListItem>
            <ListItem sx={{ display: 'list-item', ml: '20px', pl: 0 }}>
              <Typography variant="body1">
                modify, prepare derivative works of, disassemble, decompile, or reverse engineer any part of the Services or Content; or
              </Typography>
            </ListItem>
            <ListItem sx={{ display: 'list-item', ml: '20px', pl: 0 }}>
              <Typography variant="body1">
                access the Services or Content in order to build a similar or competitive website, product, or service, except as permitted under any
                Additional Terms (as defined below).
              </Typography>
            </ListItem>
          </List>
          <Typography variant="body1">
            We are always improving our Services. This means we may add or remove features, products, or functionalities; we will try to notify you
            beforehand, but that won’t always be possible. We reserve the right to modify, suspend, or discontinue the Services (in whole or in part)
            at any time, with or without notice to you. Any future release, update, or other addition to functionality of the Services will be subject
            to these Terms, which may be updated from time to time. You agree that we will not be liable to you or to any third party for any
            modification, suspension, or discontinuation of the Services or any part thereof.
          </Typography>
        </Stack>
        <Stack direction="row" spacing={2} justifyContent="center">
          <RdButton fullWidth={false} sx={{ px: 8 }} text="Back" filled color="blue" onClick={() => setOpen(false)} />
        </Stack>
      </Stack>
    </RdCard>
  )
}

export default CardUserAgreement
