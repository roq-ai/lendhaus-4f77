import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createQuote } from 'apiSdk/quotes';
import { quoteValidationSchema } from 'validationSchema/quotes';
import { LoanInterface } from 'interfaces/loan';
import { CompanyInterface } from 'interfaces/company';
import { getLoans } from 'apiSdk/loans';
import { getCompanies } from 'apiSdk/companies';
import { QuoteInterface } from 'interfaces/quote';

function QuoteCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: QuoteInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createQuote(values);
      resetForm();
      router.push('/quotes');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<QuoteInterface>({
    initialValues: {
      quote_amount: 0,
      interest_rate: 0,
      loan_term: 0,
      quote_status: '',
      loan_id: (router.query.loan_id as string) ?? null,
      company_id: (router.query.company_id as string) ?? null,
    },
    validationSchema: quoteValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Quotes',
              link: '/quotes',
            },
            {
              label: 'Create Quote',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Quote
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <NumberInput
            label="Quote Amount"
            formControlProps={{
              id: 'quote_amount',
              isInvalid: !!formik.errors?.quote_amount,
            }}
            name="quote_amount"
            error={formik.errors?.quote_amount}
            value={formik.values?.quote_amount}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('quote_amount', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Interest Rate"
            formControlProps={{
              id: 'interest_rate',
              isInvalid: !!formik.errors?.interest_rate,
            }}
            name="interest_rate"
            error={formik.errors?.interest_rate}
            value={formik.values?.interest_rate}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('interest_rate', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Loan Term"
            formControlProps={{
              id: 'loan_term',
              isInvalid: !!formik.errors?.loan_term,
            }}
            name="loan_term"
            error={formik.errors?.loan_term}
            value={formik.values?.loan_term}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('loan_term', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <TextInput
            error={formik.errors.quote_status}
            label={'Quote Status'}
            props={{
              name: 'quote_status',
              placeholder: 'Quote Status',
              value: formik.values?.quote_status,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<LoanInterface>
            formik={formik}
            name={'loan_id'}
            label={'Select Loan'}
            placeholder={'Select Loan'}
            fetcher={getLoans}
            labelField={'loan_status'}
          />
          <AsyncSelect<CompanyInterface>
            formik={formik}
            name={'company_id'}
            label={'Select Company'}
            placeholder={'Select Company'}
            fetcher={getCompanies}
            labelField={'name'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/quotes')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'quote',
    operation: AccessOperationEnum.CREATE,
  }),
)(QuoteCreatePage);
