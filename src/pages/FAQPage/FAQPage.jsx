import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import '@/index.css';
import { Footer } from '@/components/Footer';
import { MessageCard } from '@/components/MessageCard';
import { GoBack } from '@/components/GoBack';

import { Container } from '@/utils';
import { welcomeFAQ } from '@/helpers';

import { selectQuestionGroups } from '@/redux/faq/selectors';

export const FAQPage = ({ isTablet }) => {
  const faqs = useSelector(selectQuestionGroups);

  return (
    <div>
      <Container>
        <section className="nav-wrapper">
          <>
            <MessageCard type="text" text={welcomeFAQ} time="hidden" />
            <div className="nav-link-wrapper">
              {faqs?.map(faq => {
                const { _id, questionGroup, isShowInChat } = faq;

                if (isShowInChat) {
                  return (
                    <NavLink key={_id} className="nav-link" to={`/faq/${_id}`}>
                      {questionGroup}
                    </NavLink>
                  );
                }
                return null;
              })}
              <GoBack />
            </div>
          </>
        </section>
      </Container>
      <Footer isActiveMenu={true} isTablet={isTablet} />
    </div>
  );
};

FAQPage.propTypes = {
  isTablet: PropTypes.bool.isRequired,
};
