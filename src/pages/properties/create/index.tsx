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

import { createProperty } from 'apiSdk/properties';
import { propertyValidationSchema } from 'validationSchema/properties';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';
import { PropertyInterface } from 'interfaces/property';

function PropertyCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: PropertyInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createProperty(values);
      resetForm();
      router.push('/properties');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<PropertyInterface>({
    initialValues: {
      address: '',
      property_value: 0,
      property_type: '',
      property_status: '',
      owner_id: (router.query.owner_id as string) ?? null,
    },
    validationSchema: propertyValidationSchema,
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
              label: 'Properties',
              link: '/properties',
            },
            {
              label: 'Create Property',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Property
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.address}
            label={'Address'}
            props={{
              name: 'address',
              placeholder: 'Address',
              value: formik.values?.address,
              onChange: formik.handleChange,
            }}
          />

          <NumberInput
            label="Property Value"
            formControlProps={{
              id: 'property_value',
              isInvalid: !!formik.errors?.property_value,
            }}
            name="property_value"
            error={formik.errors?.property_value}
            value={formik.values?.property_value}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('property_value', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <TextInput
            error={formik.errors.property_type}
            label={'Property Type'}
            props={{
              name: 'property_type',
              placeholder: 'Property Type',
              value: formik.values?.property_type,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.property_status}
            label={'Property Status'}
            props={{
              name: 'property_status',
              placeholder: 'Property Status',
              value: formik.values?.property_status,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<UserInterface>
            formik={formik}
            name={'owner_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
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
              onClick={() => router.push('/properties')}
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
    entity: 'property',
    operation: AccessOperationEnum.CREATE,
  }),
)(PropertyCreatePage);
